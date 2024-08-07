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
    const userId = this.store.selectSnapshot(AuthState.userId);
    console.log('user details service', userId);

    if (userId === null || userId == undefined) {
      return '0';
    }
    return userId;
  }

  getUserRole(): Role | undefined {
    const role = this.store.selectSnapshot(AuthState.userRole);
    return role;
  }


  getUserDetails(): LoginResponseDto {
    const user = this.store.selectSnapshot(AuthState.userDetails);
    return user;
  }
}
