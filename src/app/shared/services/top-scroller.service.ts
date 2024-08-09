import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TopScrollerService {

  constructor() { }

  navigateToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
