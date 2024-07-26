import { Component, DestroyRef, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';








@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,

  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  // defaultImage = environment.defaultImage
  isLoggedIn = false;
  userDetails!: any
  // userType: typeof Role = Role;
  // role!: Role;
  data$!: Observable<any>;
  @Input() imgUrl!: string;

  destroyRef = inject(DestroyRef)


  ngOnInit(): void {

    this.getUserDetails();
    this.getLogo();
    // this.checkUser()

  }
  // private checkUser = (): Role => { return this.role = this.userDetailsService.getUserRole() };


  getLogo() {
    // this.data$ = this.homeService.getHomeContents(getDeviceId(), this.userDetailsService.getUserId())
    //   .pipe(
    //     map((res: any) => {
    //       this.homeService.homeContents.set(res.home);
    //       // this.homeStateService.setState(res.home)
    //       console.log('logo', res.home);

    //       return res.home
    //     })
    //   )
  }


  private getUserDetails() {
    // this.userDetails = this.userDetailsService.getUserDetails();
    console.log('user', this.userDetails);

    // if (this.userDetails.token) this.isLoggedIn = true;
  }

  // public onViewCart = () => { this.router.navigate(['/cart']); }

  public onLogout() {
    // let response = this.authService.logout()
    // response
    //   .pipe(
    //     takeUntilDestroyed(this.destroyRef)
    //   )
    //   .subscribe((res: any) => {
    //     if (res) {
    //       this.store.dispatch(new Logout());
    //       this.isLoggedIn = false;
    //       localStorage.removeItem('auth');
    //       location.reload();
    //       this.messageService.showSuccessMessage(res.message);


    //     }
    //   })


  }
}
