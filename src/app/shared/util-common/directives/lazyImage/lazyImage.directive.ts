import {
  Directive,
  ElementRef,
  Renderer2,
  inject,
  input,
  signal,
  effect,
  DestroyRef,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appLazyImg]',
  standalone: true,
})
export class LazyImgDirective {
  private el = inject(ElementRef<HTMLImageElement>);
  private renderer = inject(Renderer2);
  private destroyRef = inject(DestroyRef);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  // ✅ Inputs using Angular signals
  appLazyImg = input<string>();
  fallbackImg = input<string>('assets/images/no-image.png');

  // ✅ Internal state signals
  private isLoading = signal(true);
  private observer?: IntersectionObserver;

  constructor() {
    // ✅ Apply shimmer effect reactively
    effect(() => {
      const el = this.el.nativeElement;
      if (this.isLoading()) {
        this.renderer.setStyle(el, 'opacity', '0.5');
        this.renderer.setStyle(
          el,
          'background',
          'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)'
        );
        this.renderer.setStyle(el, 'backgroundSize', '200% 100%');
        this.renderer.setStyle(el, 'animation', 'shimmer 1.2s infinite linear');
      } else {
        this.renderer.removeStyle(el, 'background');
        this.renderer.removeStyle(el, 'animation');
        this.renderer.setStyle(el, 'opacity', '1');
        this.renderer.setStyle(el, 'transition', 'opacity 0.3s ease-in');
      }
    });

    // ✅ Observe for lazy load trigger (browser only)
    if (this.isBrowser) {
      this.observeImage();
    } else {
      // SSR fallback: immediately set fallback or nothing
      this.renderer.setAttribute(
        this.el.nativeElement,
        'src',
        this.fallbackImg()
      );
    }

    // ✅ Auto cleanup on destroy
    this.destroyRef.onDestroy(() => this.observer?.disconnect());
  }

  private observeImage() {
    if (!this.isBrowser) return;

    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.setImageSrc();
            this.observer?.unobserve(this.el.nativeElement);
          }
        }
      });
      this.observer.observe(this.el.nativeElement);
    } else {
      // fallback for older browsers
      this.setImageSrc();
    }
  }

  private setImageSrc() {
    if (!this.isBrowser) return;

    const el = this.el.nativeElement;
    const src = this.appLazyImg() || this.fallbackImg();

    this.isLoading.set(true);

    const onLoad = () => this.isLoading.set(false);
    const onError = () => {
      this.renderer.setAttribute(el, 'src', this.fallbackImg());
      this.isLoading.set(false);
    };

    el.addEventListener('load', onLoad, { once: true });
    el.addEventListener('error', onError, { once: true });

    this.renderer.setAttribute(el, 'src', src);
  }
}
