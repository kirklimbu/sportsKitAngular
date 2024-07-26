import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { from } from 'rxjs';
import { AuthState } from 'src/app/domains/auth/login/state/login.state';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  constructor(private router: Router, private store: Store) { }

  canActivate() {
    const isAuthenticated = this.store.selectSnapshot(
      AuthState.isAuthenticated
    );

    if (!isAuthenticated) {
      return from(this.router.navigate(['/auth/login']));
    }
    return true;
  }


}

// start from here
export const isAdmin = () => {
  const userStore = inject(AuthState.userDetails);
  console.log('user details', userStore);

  const router = inject(Router);
  if (userStore.role == 'Admin') {
    return true
  }
  return userStore.isUserLoggedIn$.pipe(
    // mergeMap((hasUser) =>
    //   iif(
    //     () => hasUser,
    //     userStore.isAdmin$.pipe(map(Boolean)),
    //     of(router.parseUrl('no-user'))
    //   )
    // )
  );
};

// export const hasRole = (accessRolesList: Role[]) => {
//   const userStore = inject(UserStore);
//   const router = inject(Router);
//   return userStore.isUserLoggedIn$.pipe(
//     mergeMap((hasUser) =>
//       iif(
//         () => hasUser,
//         userStore.hasAnyRole(accessRolesList).pipe(map(Boolean)),
//         of(router.parseUrl('no-user'))
//       )
//     )
//   );
// };