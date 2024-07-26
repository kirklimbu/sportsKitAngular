/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-explicit-any */
export namespace Auth {
  export class Login {
    static readonly type = '[Auth] Login';
    constructor(public payload: { username: string; password: string, deviceId: string }) { }
  }

  export class Logout {
    static readonly type = '[Auth] Logout';
  }

  export class CheckSession {
    static type = '[Auth] CheckSession';
  }
  export class LogoutSuccess {
    static type = '[Auth] LogoutSuccess';
  }

  // Events
  export class LoginRedirect {
    static type = '[Auth] LoginRedirect';
  }

  export class LoginSuccess {
    [x: string]: string | number | null | undefined;
    static type = '[Auth] LoginSuccess';
    token: string | null | undefined;
    userId: number | null | undefined;
    role: string | undefined;
    name: string | null | undefined;
    constructor(public jwt: any) { }
  }
  export class LoginFailed {
    static type = '[Auth] LoginFailed';
    constructor(public error: any) { }
  }
}
