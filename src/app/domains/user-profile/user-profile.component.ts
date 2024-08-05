// import { Customer } from './../customer/data/models/customer';
import { Component, EventEmitter, OnInit, Output, Type, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngxs/store';
import { AuthState } from '../auth/login/state/login.state';
// third-party
// import { ChipsModule } from 'primeng/chips';
// import { ChipModule } from 'primeng/chip';
// import { ButtonModule } from 'primeng/button';
import { UserModel } from 'src/app/shared/util-auth/models/user.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
// import { customer } from '../customer/customer-details-add/customer-details-add.component';

import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { UserDetailsService } from 'src/app/shared/util-common/userDetails.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    CommonModule,
    // ChipModule,
    // ButtonModule,
    ReactiveFormsModule,
    NzDescriptionsModule,
    NzDrawerModule,
    NzListModule,
    NzDividerModule
  ],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userProfile!: UserModel
  // showEdit1: boolean = false;
  // showEdit2: boolean = false;
  form!: FormGroup;

  address1$: Subject<string> = new Subject();
  showPersonalInfo = true; //default false rakhne

  @Output()
  orderDetails: EventEmitter<any> = new EventEmitter<any>();
  // currentCustomer = any;
  private userDetailService = inject(UserDetailsService)

  constructor(private store: Store,
    private fb: FormBuilder,

  ) {
    this.fetchUserDetails();

  }

  ngOnInit() {
    // console.log(this.userProfile);
    this.initForm();
    this.getUserDetails()
    if (this.userProfile.userId) {
      this.showPersonalInfo = true
      this.orderDetails.emit(this.userProfile)
    }

  }

  getUserDetails() {
    this.userProfile = this.userDetailService.getUserDetails();
    console.log('user details', this.userProfile);

  }

  initForm() {
    this.form = this.fb.group({
      deviceId: [0],
      userId: [0],
      name: [],
      addressOne: '',
      addressTwo: '',
      latitude: '',
      longitude: '',
      mobile: []
    })
  }

  private fetchUserDetails() {
    this.userProfile = this.store.selectSnapshot(AuthState.userDetails);

  }

  onUpdateAddress1(primaryAddress: string, userDetail: UserModel) {

    this.form.patchValue(userDetail);
    this.form.patchValue({
      addressOne: primaryAddress
    })
    this.orderDetails.emit(this.form.value)

    this.userProfile = this.form.value;
  }
  onUpdateAddress2(secondaryAddress: string, userDetail: any) {
    this.form.patchValue(this.userProfile);
    this.form.patchValue({
      addressTwo: secondaryAddress
    })
    // console.log('form value after', this.form.value)
    this.orderDetails.emit(this.form.value);
  }


  onConfrimOrder() {
    // console.log('form', this.form.value);
    this.orderDetails.emit(this.form.value)
  }
}
