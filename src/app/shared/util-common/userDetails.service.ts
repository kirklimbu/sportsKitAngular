import { Injectable, inject } from '@angular/core';
import { Store } from '@ngxs/store';

import { AuthState } from 'src/app/domains/auth/login/state/login.state';
import { LoginResponseDto, Role, UserModel } from '../util-auth/models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {

  isAuthenticated$!: Observable<boolean>;

  store = inject(Store)

  getUserStatus() {
    const isAuthenticated$ = this.store.select(AuthState.isAuthenticated);
    return isAuthenticated$;
  }

  getUserId() {
    const userDetail = this.store.selectSnapshot(AuthState.userDetails);
    if (userDetail.userId == 'null' || userDetail.userId == 'undefined' || userDetail.userId == undefined) {
      return '0';
    }
    return userDetail.userId;
  }

  getUserRole(): Role {
    const user = this.store.selectSnapshot(AuthState.userDetails);
    return user.user.role;
  }


  getUserDetails(): LoginResponseDto {
    const user = this.store.selectSnapshot(AuthState.userDetails);
    return user;
  }
}
