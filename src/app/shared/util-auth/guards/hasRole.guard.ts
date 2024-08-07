import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Role } from '../models/user.model';
import { UserDetailsService } from '../../util-common/userDetails.service';



export const hasRoleGuard: CanActivateFn = (route, state) => {
    const router: Router = inject(Router);
    const userRole: Role | undefined = inject(UserDetailsService).getUserRole();

    const expectedRoles: Role[] = route.data['roles'];
    console.log('roles', userRole);
    console.log('exp roles', expectedRoles);

    const hasRole: boolean = expectedRoles.some((role) => userRole === role);

    return hasRole || router.navigate(['/auth/login']);
};