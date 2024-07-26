
import { Injectable, inject } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class RefreshPageService {

  constructor(private router: Router) { }
  refresh() {
    console.log("refreshPage", this.router);
    // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    // this.router.onSameUrlNavigation = "reload";
    // return this.router.navigate([this.router.url]);

    const currentRoute = this.router.url;
    const url: any = currentRoute.split('?')[0]
    let id: any = currentRoute.split('?')[1]

    if (id) {
      id = id.split('=')[1]
    }

    this.router.navigateByUrl('/', { skipLocationChange: true })
      .then(() => {
        if (id) {
          this.router.navigate([url], { queryParams: { id } });
          return
        }
        this.router.navigate([url])
      });

  }
}

export function refreshPage() {

  const router = inject(Router)
  const currentRoute = router.url;
  const url: any = currentRoute.split('?')[0]
  let id: any = currentRoute.split('?')[1]

  if (id) {
    id = id.split('=')[1]
  }

  router.navigateByUrl('/', { skipLocationChange: true })
    .then(() => {
      if (id) {
        router.navigate([url], { queryParams: { id } });
        return
      }
      router.navigate([url])
    });
}

