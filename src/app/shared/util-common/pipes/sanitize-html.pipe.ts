import { Pipe, PipeTransform, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'sanitizeHtml',
  standalone: true
})
export class SanitizeHtmlPipe implements PipeTransform {

  private readonly sanitizer = inject(DomSanitizer)

  transform(html: string): SafeHtml {
    console.log('sanitize', this.sanitizer.bypassSecurityTrustHtml(html));

    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

}
