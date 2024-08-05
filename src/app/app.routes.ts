import { Route } from '@angular/router';
import { COMMON_LAYOUT_ROUTES } from './layouts/common-layout/common-layout.routes';
import { CommonLayoutComponent } from './layouts/common-layout/common-layout.component';
import { LoginComponent } from './domains/auth/login/login.component';
import { RegistrationComponent } from './domains/auth/registration/registration.component';
import { MemberEntryComponent } from './domains/members/member-entry/member-entry.component';
import { AdminComponent } from './domains/admin/admin.component';
import { AuthGuard } from './shared/util-auth/guards/auth.guard';

export const appRoutes: Route[] = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },

    {
        path: 'auth',
        loadChildren: () =>
            import('./domains/auth').then((m) => m.FEATURE_AUTH_ROUTES),
    },
    {
        path: 'admin',
        data: {
            breadcrumb: {
                label: 'admin'
            }
        },
        component: AdminComponent,
        loadChildren: () =>
            import('../app/domains/admin').then((m) => m.FEATURE_ADMIN_ROUTES),
    },


    // {
    //     path: 'auth/login',
    //     component: LoginComponent
    // },
    // {
    //     path: 'auth/add-member',
    //     component: MemberEntryComponent,
    // },

    {
        path: '',
        data: {
            breadcrumb: 'the store'
        },
        component: CommonLayoutComponent,
        children: COMMON_LAYOUT_ROUTES
    },
    // { 
    //     path: '', 
    //     component: FullLayoutComponent, 
    //     children: FullLayout_ROUTES
    // } 
    {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full',
    },
];
