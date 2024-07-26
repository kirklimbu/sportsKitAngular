import { DestroyRef, Injectable, inject } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Router, RoutesRecognized } from "@angular/router";
import { BehaviorSubject, Observable, filter, pairwise } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UrlService {
  private previousUrl: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );
  private currentUrl: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );
  public previousUrl$: Observable<string> = this.previousUrl.asObservable();
  public currentUrl$: Observable<string> = this.currentUrl.asObservable();
  // previousURL!: string
  destroyRef = inject(DestroyRef)

  constructor(
    private router: Router,
  ) {
    this.setPreviousPage()
  }

  private setPreviousPage() {

    this.router.events
      .pipe(takeUntilDestroyed(this.destroyRef))
      .pipe(filter((evt: any) => evt instanceof RoutesRecognized), pairwise())
      .subscribe((events: RoutesRecognized[]) => {
        // console.log('urls ', events);

        this.currentUrl.next(events[1].url);
        this.previousUrl.next(events[0].urlAfterRedirects);
        // console.log('previous url', this.previousUrl);
      });

  }

  setPreviousUrl(previousUrl: string) {
    this.previousUrl.next(previousUrl);
  }
  setCurrentUrl(currentUrl: string) {
    this.currentUrl.next(currentUrl);
  }


}
