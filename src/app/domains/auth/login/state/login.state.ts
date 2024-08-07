import { IMember } from './../../../members/data/models/member.model';
import { Injectable } from '@angular/core';
import { State, Selector, Action, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';

import { Auth } from './login.actions';
import { Login, Logout } from './login.model';
import { LoginResponseDto, Role, UserModel } from 'src/app/shared/util-auth/models/user.model';
import { AuthService } from 'src/app/shared/util-auth/services/auth-http/auth.service';

// Initialize the state
const defaults: LoginResponseDto = {
  member: undefined,
  traineeList: undefined,
  user: {
    token: '',
    roleId: 0,
    userId: 0,
    name: '',
    role: Role?.NONE,
    mobile: '',

  },
  // token: '',
  // roleId: 0,
  // userId: 0,
  // name: '',
  // role: Role?.NONE,
  // mobile: '',
  // addressOne: '',
  // addressTwo: '',
  // email: '',
}

@State<LoginResponseDto>({
  name: 'auth',

  defaults: {
    user: {
      token: '',
      roleId: 0,
      userId: 0,
      name: '',
      role: Role?.NONE,
      mobile: '',

    },
    member: {
      memberId: 0,
      dob: '',
      name: '',
      memberShip: '',
      mobile1: '',
      mobile2: '',
      status: '',
      profilePic: '',
    },
    traineeList: {

    },

  },
})

@Injectable()
export class AuthState {

  @Selector()
  static token(state: LoginResponseDto): string | null | undefined {
    return state.user?.token;
  }

  @Selector()
  static isAuthenticated(state: LoginResponseDto): boolean {
    return !!state.user?.token;
  }

  @Selector()
  static userRole(state: LoginResponseDto): Role | undefined {
    return state.user?.role;
  }

  @Selector()
  static userId(state: LoginResponseDto): number | undefined {
    return state.user.userId;
  }

  @Selector()
  static userDetails(state: LoginResponseDto): LoginResponseDto {
    return {
      // name: state?.name,
      // role: state?.role,
      // mobile: state?.mobile,
      // // email: state?.email,
      // userId: state?.userId,
      // roleId: state?.roleId,
      // token: state?.token,
      // addressOne: state?.addressOne,
      // addressTwo: state?.addressTwo,
      user: state.user,
      member: state.member,
      traineeList: state.traineeList
    };
  }

  constructor(private authService: AuthService) { }
  @Action(Login)
  login(ctx: StateContext<LoginResponseDto>, action: Login) {
    return this.authService
      .login(action.payload.username, action.payload.password, action.payload.deviceId)
      .pipe(
        tap((result: LoginResponseDto) => {
          console.log('calling auth state', result)
          ctx.patchState({
            // name: result.name,
            // role: result.role,
            // email: result.email,
            // mobile: result.mobile,
            // token: result.token,
            // roleId: result.roleId,
            // userId: result.userId,
            // addressOne: result.addressOne,
            // addressTwo: result.addressTwo,
            user: result.user,
            member: result.member,
            traineeList: result.traineeList,
          });
        })
      );
  }

  @Action(Logout)
  logout(ctx: StateContext<LoginResponseDto>) {
    ctx.setState({
      ...defaults
    });

  }

  //   @Action(Auth.LoginRedirect)
  //   onLoginRedirect(ctx: StateContext<LoginResponseDto>) {
  //     console.log("onLoginRedirect, navigating to /auth/login");
  //     ctx.dispatch(new Navigate(["/auth/login"]));
  //   }

  @Action(Auth.LoginSuccess)
  onLoginSuccess(
    ctx: StateContext<LoginResponseDto>,
    payload: Auth.LoginSuccess
  ) {
    console.log('onLoginSuccess, navigating to /dashboard');
    ctx.patchState({
      // user: payload.user?.token,
      // userId: payload.userId || 0,
      // role: payload.role,
      // name: payload.name,
      // isSuperUser: payload.jwt.isSuper,
      // refreshToken: payload.jwt.refreshToken,
      // isLoading: false,
    });
    //   payload.jwt.isSuper?
    //       ctx.dispatch(new Navigate(['/dashboard'])):
    //       ctx.dispatch(new Navigate(['/userHome']));
  }

  //   @Action([Auth.LoginFailed, Auth.LogoutSuccess])
  //   setUserStateOnFailure(ctx: StateContext<LoginResponseDto>) {
  //     ctx.patchState({
  //       token: null,
  //       // refreshToken: null,
  //       username: "",
  //       // userId: '',
  //       // isSuperUser: false,
  //       // isLoading: false
  //     });
  //     ctx.dispatch(new Auth.LoginRedirect());
  //   }
}
