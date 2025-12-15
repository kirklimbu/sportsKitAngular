import { Route } from '@angular/router';
import { AdminComponent } from './domains/admin/admin.component';
import { CommonLayoutComponent } from './layouts/common-layout/common-layout.component';
import { COMMON_LAYOUT_ROUTES } from './layouts/common-layout/common-layout.routes';

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
            breadcrumb: ''
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
