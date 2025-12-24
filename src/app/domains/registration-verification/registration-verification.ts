import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzInputModule } from 'ng-zorro-antd/input';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  Observable,
  of,
  shareReplay,
  startWith,
  switchMap,
  tap,
} from 'rxjs';
import { TournamentService } from '../tournament/data/tournament.service';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { MessageService } from 'src/app/shared/util-logger/message.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-registration-verification',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzCardModule,
    NzImageModule,
    NzIconModule,
    NzFormModule,
    NzInputModule,
    NzEmptyModule,
    NzAvatarModule,
    NzDividerModule,
  ],
  templateUrl: './registration-verification.html',
  styleUrl: './registration-verification.scss',
})
// player registration verification
export class RegistrationVerification implements OnInit {
  data$!: Observable<any[]>;
  searchControl = new FormControl('', { nonNullable: true });
  private placesService = inject(TournamentService);
  private readonly messageService = inject(MessageService);
  private readonly notification = inject(NzNotificationService);

  ngOnInit(): void {
    this.searchMobile();
  }

  searchMobile(): void {
    this.data$ = this.searchControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      map((v: string) => v?.trim()), // trim whitespace
      filter((v: string) => !!v && v.length === 10), // only call API if 10 digits
      switchMap((mobile: string) =>
        this.placesService.verifyRegistration(mobile).pipe(
          // Local catchError ensures stream continues if server fails
          catchError((err) => {
            console.error('API error:', err);
            // Return empty fallback so the stream is alive
            return of({ tournamentList: [], message: '' });
          })
        )
      ),
      tap((res: any) => {
        if (res?.message) {
          const lowerMsg = res.message.toLowerCase();

          // Decide icon type
          const iconType: 'success' | 'info' = lowerMsg.includes('sorry')
            ? 'info'
            : 'success';

          // Show notification with icon only, message unchanged
          this.createNotification(iconType, res.message);
        }
      }),
      map((res: any) => res.tournamentList || []),
      shareReplay(1)
    );
  }

  private createNotification(type: string, msg: string): void {
    console.log('type', type);

    this.notification.create(
      type,
      '<strong>Registration Status</strong>',
      msg,
      {
        nzPlacement: 'top',
      }
    );
  }
}
