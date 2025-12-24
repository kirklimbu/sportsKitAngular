import { inject, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({ name: 'safeUrl' })
export class SafeUrlPipe implements PipeTransform {
  private sanitizer = inject(DomSanitizer);
  transform(url: string | null | undefined): SafeResourceUrl {
    if (!url) url = 'about:blank'; // fallback if null
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
