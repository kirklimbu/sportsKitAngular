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

  // Inputs
  appLazyImg = input<string>();
  fallbackImg = input<string>('assets/images/no-image.png');

  // Internal signals
  private isLoading = signal(true);
  private observer?: IntersectionObserver;

  constructor() {
    // Shimmer effect
    effect(() => {
      const el = this.el.nativeElement;
      if (this.isLoading()) {
        this.renderer.setStyle(el, 'opacity', '0.5');
        this.renderer.setStyle(
          el,
          'background',
          'linear-gradient(90deg,#f0f0f0 25%,#e0e0e0 50%,#f0f0f0 75%)'
        );
        this.renderer.setStyle(el, 'backgroundSize', '200% 100%');
        this.renderer.setStyle(el, 'animation', 'shimmer 1.2s infinite linear');
      } else {
        this.renderer.removeStyle(el, 'background');
        this.renderer.removeStyle(el, 'animation');
        this.renderer.setStyle(el, 'opacity', '1');
        this.renderer.setStyle(el, 'transition', 'opacity 0.3s');
      }
    });

    // Lazy loading
    if (this.isBrowser) {
      this.observeImage();
    }

    this.destroyRef.onDestroy(() => this.observer?.disconnect());
  }

  private observeImage() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.setImageSrc();
          this.observer?.disconnect();
        }
      });
    });

    this.observer.observe(this.el.nativeElement);
  }
private setImageSrc() {
  if (!this.isBrowser) return;

  const el = this.el.nativeElement;
  const src = this.appLazyImg() || this.fallbackImg();

  this.isLoading.set(true);

  const onLoad = () => this.isLoading.set(false);

  const onError = () => {
    const fallback = this.fallbackImg();
    this.renderer.setAttribute(el, 'src', fallback);
    this.isLoading.set(false);
  };

  el.addEventListener('load', onLoad, { once: true });
  el.addEventListener('error', onError, { once: true });

  // ✔ Only set NORMAL src
  this.renderer.setAttribute(el, 'src', src);
}



 
}
