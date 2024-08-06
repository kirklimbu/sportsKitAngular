import { UsersService } from './../user/data/services/users.service';
// import { Customer } from './../customer/data/models/customer';
import { Component, EventEmitter, OnInit, Output, Type, Input, inject, TemplateRef, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngxs/store';
import { AuthState } from '../auth/login/state/login.state';
// third-party
// import { ChipsModule } from 'primeng/chips';
// import { ChipModule } from 'primeng/chip';
// import { ButtonModule } from 'primeng/button';
import { LoginResponseDto, Role, UserModel } from 'src/app/shared/util-auth/models/user.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, Subject, map, switchMap } from 'rxjs';
// import { customer } from '../customer/customer-details-add/customer-details-add.component';

import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { UserDetailsService } from 'src/app/shared/util-common/userDetails.service';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ActivatedRoute, ParamMap, Router, RouterModule } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NepaliDatepickerModule, NepaliDatepickerService } from 'nepali-datepicker-angular';


@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    // ChipModule,
    // ButtonModule,
    ReactiveFormsModule,
    NzDescriptionsModule,
    NzDrawerModule,
    NzListModule,
    NzDividerModule,
    NzImageModule,
    NzSpaceModule,
    NzAvatarModule,
    NzButtonModule,
    NzRadioModule,
    NzIconModule,
    NepaliDatepickerModule,

  ],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {


  id$!: Observable<number>;
  userProfile!: LoginResponseDto
  userProfile$!: Observable<LoginResponseDto>

  form!: FormGroup;
  userRole!: Role
  address1$: Subject<string> = new Subject();
  showPersonalInfo = true; //default false rakhne

  @Output()
  orderDetails: EventEmitter<any> = new EventEmitter<any>();
  // currentCustomer = any;
  private readonly _nepaliDatepickerService = inject(NepaliDatepickerService);
  private readonly userDetailService = inject(UserDetailsService)
  private readonly router = inject(Router)
  private readonly route = inject(ActivatedRoute);
  private readonly unsubscribe$ = inject(DestroyRef);
  private readonly usersService = inject(UsersService)
  date: Date = new Date();


  constructor(private store: Store,
    private fb: FormBuilder,

  ) {
    // this.fetchUserDetails();

  }

  ngOnInit() {
    // console.log(this.userProfile);

    this.getUserRole()
    this.checkFormStatus()
    // if (this.userProfile.userId) {
    //   this.showPersonalInfo = true
    //   this.orderDetails.emit(this.userProfile)
    // }

  }

  private checkFormStatus() {
    this.id$ = this.route.queryParamMap.pipe(
      map((params: ParamMap) => Number(params.get('memberId')))
    );
    this.id$.pipe(takeUntilDestroyed(this.unsubscribe$))
      .subscribe((_res: any) => {
        console.log('fomn res', _res);
        this.getUserDetails()
      });
  }

  getUserDetails() {
    // call api 
    // send userId
    // send memberId
    // send traineeId
    // this.userProfile = this.userDetailService.getUserDetails();
    this.userProfile$ = this.id$.pipe(
      switchMap((query: number) => this.usersService.getUserById(query))
    );
    // this.userProfile$.pipe(takeUntilDestroyed(this.unsubscribe$))
    //   .subscribe((_res: any) => {

    //     this.form.patchValue(_res.form);
    //     const BSDate = this._nepaliDatepickerService.BSToAD(
    //       _res.form.dob,
    //       'yyyy/mm/dd'
    //     );
    //     this.date = new Date(BSDate);
    //     // this.cd.detectChanges();
    //   });

  }

  getUserRole(): void {
    this.userRole = this.userDetailService.getUserRole();
    console.log('role', this.userRole);


  }

  private fetchUserDetails() {
    // this.userProfile = this.store.selectSnapshot(AuthState.userDetails);
    // this.userProfile = this.usersService.getUserById();

  }

  onEdit(id?: number) {
    this.router.navigate(['/admin/add-member'], { queryParams: { id: id } })

  }
  onMakePayment(id?: number) {
    this.router.navigate(['/admin/payment'], { queryParams: { id: id, paymentType: true } })

  }
  onEditPayment(id?: number) {
    this.router.navigate(['/admin/payment'], { queryParams: { id: id, paymentType: true } })

  }
  onViewPaymentHistory(id?: number) {
    this.router.navigate(['/admin/payment'], { queryParams: { id: id, paymentType: true } })

  }

}
