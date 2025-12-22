// libs/shared/data-access/src/lib/interceptors/error.interceptor.ts
import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { catchError, throwError } from 'rxjs';

/**
 * Notes:
 * - This implementation is defensive: it escapes server strings to avoid XSS.
 * - It deduplicates identical notifications for a short time window to prevent spam.
 * - It handles common HTTP statuses specially (401, 403, 500).
 */

const NOTIF_DURATION = 10_000; // ms
const NOTIF_PLACE = 'topRight' as const;
const DEDUPE_WINDOW = 5_000; // ms - identical notifications within this window are ignored

// Simple in-memory dedupe map: key -> timestamp
const recentNotifications = new Map<string, number>();

export function errorInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) {
  const notification = inject(NzNotificationService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse | any) => {
      handleValidationErrors(error, notification, router);
      return throwError(() => error);
    })
  );
}

/* Utility: escape HTML to prevent XSS */
function escapeHtml(str: unknown): string {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/* Create normalized list of error messages */
function normalizeErrors(raw: unknown): string[] {
  if (!raw) return [];
  if (Array.isArray(raw)) {
    return raw.map((r) => (typeof r === 'string' ? r : JSON.stringify(r)));
  }
  // If server sometimes returns single string or object:
  if (typeof raw === 'string') return [raw];
  try {
    return [JSON.stringify(raw)];
  } catch {
    return [String(raw)];
  }
}

/* Build HTML safe content: escaped message + escaped bullet list */
function buildNotificationHtml(mainMessage: string, errors: string[]): string {
  const safeMain = escapeHtml(mainMessage);
  const listHtml = errors.length
    ? `<ul style="padding-left:18px; margin:6px 0 0;">${errors
        .map((e) => `<li>${escapeHtml(e)}</li>`)
        .join('')}</ul>`
    : '';

  return `<div><div style="font-weight:600; margin-bottom:4px;">${safeMain}</div>${listHtml}</div>`;
}

/* Dedupe check: returns true if we should skip showing because same key shown recently */
function shouldSkipDuplicate(key: string) {
  const now = Date.now();
  const last = recentNotifications.get(key);
  if (!last) {
    recentNotifications.set(key, now);
    // cleanup old entries occasionally
    setTimeout(() => {
      for (const [k, t] of recentNotifications) {
        if (now - t > DEDUPE_WINDOW * 4) recentNotifications.delete(k);
      }
    }, DEDUPE_WINDOW * 4);
    return false;
  }
  if (now - last < DEDUPE_WINDOW) {
    return true;
  }
  recentNotifications.set(key, now);
  return false;
}

/* Main handler */
function handleValidationErrors(
  error: HttpErrorResponse | any,
  notification: NzNotificationService,
  router?: Router
): void {
  // If offline
  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    const offlineKey = 'network-offline';
    if (!shouldSkipDuplicate(offlineKey)) {
      notification.error(
        'Network Error',
        'You appear to be offline. Please check your connection.',
        {
          nzDuration: NOTIF_DURATION,
          nzPlacement: NOTIF_PLACE,
        }
      );
    }
    return;
  }

  // Normalize structure - server may return body under different shapes
  const apiError =
    error instanceof HttpErrorResponse ? error.error ?? {} : error ?? {};
  const apiMessage =
    apiError?.message ??
    apiError?.msg ??
    error?.message ??
    'Something went wrong';
  const rawErrors = apiError?.errors ?? apiError?.details ?? null;

  const detailErrors = normalizeErrors(rawErrors);

  // Create content
  const contentHtml = buildNotificationHtml(apiMessage, detailErrors);

  // Dedupe key - include status + message + errors
  const statusPart =
    error && typeof error.status !== 'undefined'
      ? `status:${error.status}`
      : 'status:unknown';
  const key = `${statusPart}|${apiMessage}|${detailErrors.join('|')}`;

  if (shouldSkipDuplicate(key)) {
    // skip duplicate notification
    return;
  }

  // Special handling for some status codes (optional)
  const status = error?.status;
  if (status === 401) {
    // Optional: redirect to login or show a specific message
    notification.error('Unauthorized', contentHtml, {
      nzDuration: NOTIF_DURATION,
      nzPlacement: NOTIF_PLACE,
      nzCloseIcon: 'close',
    });
    // Example: navigate to login (be careful: avoid infinite loops)
    // router?.navigate(['/login']);
    return;
  }

  if (status === 403) {
    notification.error('Forbidden', contentHtml, {
      nzDuration: NOTIF_DURATION,
      nzPlacement: NOTIF_PLACE,
      nzCloseIcon: 'close',
    });
    return;
  }

  if (status >= 500) {
    notification.error('Server Error', contentHtml, {
      nzDuration: NOTIF_DURATION,
      nzPlacement: NOTIF_PLACE,
      nzCloseIcon: 'close',
    });
    return;
  }

  // Default: show validation / error message
  notification.error('Error', contentHtml, {
    nzDuration: NOTIF_DURATION,
    nzPlacement: NOTIF_PLACE,
    nzCloseIcon: 'close',
  });
}
