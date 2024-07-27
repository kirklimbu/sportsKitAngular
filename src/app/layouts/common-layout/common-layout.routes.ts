import { Routes } from '@angular/router';
import { PrivacyPolicyComponent } from 'src/app/domains/privacy-policy/privacy-policy.component';
// import { StudyInJapanComponent } from '../../study-destinations/study-in-japan/study-in-japan.component';
// import { StudyInKoreaComponent } from '../../study-destinations/study-in-korea/study-in-korea.component';
// import { IeltsComponent } from '../../test-preparations/ielts/ielts.component';
// import { EpsTopikComponent } from '../../test-preparations/eps-topik/eps-topik.component';
// import { TopikTestComponent } from '../../test-preparations/topik-test/topik-test.component';
// import { JapaneseLanguageComponent } from '../../test-preparations/japanese-language/japanese-language.component';
// import { OurLocationComponent } from '../../our-location/our-location.component';


export const COMMON_LAYOUT_ROUTES: Routes = [

    //Dashboard
    {
        path: 'home',
        data: {
            breadcrumb: 'Home'
        },
        loadChildren: () => import('./../../domains/home').then(m => m.FEATURE_HOME_ROUTES),
    },
    {
        path: 'events',
        data: {
            breadcrumb: 'Events'
        },
        loadChildren: () => import('./../../domains/events').then(m => m.FEATURE_EVENTS_ROUTES),
    },
    {
        path: 'privacy',
        data: {
            breadcrumb: 'Privacy Policies'
        },
        component: PrivacyPolicyComponent,
    },
    // {
    //     path: 'studyInKorea',
    //     component: StudyInKoreaComponent,
    // },
    // // test-preparations
    // {
    //     path: 'ielts',
    //     component: IeltsComponent,
    // },
    // {
    //     path: 'eps-topik',
    //     component: EpsTopikComponent,
    // },
    // {
    //     path: 'topik-test',
    //     component: TopikTestComponent,
    // },
    // {
    //     path: 'japanese-language',
    //     component: JapaneseLanguageComponent,
    // },
    // {
    //     path: 'contact-us',
    //     component: OurLocationComponent,
    // },


    //Apps
    {
        path: 'apps',
        data: {
            title: 'Apps'
        },
        children: [
            {
                path: '',
                redirectTo: '/dashboard',
                pathMatch: 'full'
            },
            // {
            //     path: '',
            //     loadChildren: () => import('../../apps/apps.module').then(m => m.AppsModule)
            // },
        ]
    },

    //Component
    // {
    //     path: 'demo',
    //     component: ComponentsComponent,
    //     children: [
    //         {
    //             path: '',
    //             redirectTo: '/components/affix',
    //             pathMatch: 'full'
    //         },
    //         {
    //             path: '',
    //             loadChildren: () => import('../../components/components.module').then(m => m.ComponentsModule)
    //         }
    //     ],
    //     data: {
    //         title: 'Components '
    //     }
    // },

    // Charts
    // {
    //     path: 'charts',
    //     data: {
    //         title: 'Charts'
    //     },
    //     children: [
    //         {
    //             path: '',
    //             redirectTo: '/dashboard',
    //             pathMatch: 'full'
    //         },
    //         {
    //             path: '',
    //             loadChildren: () => import('../../charts/charts.module').then(m => m.ChartsModule)
    //         },
    //     ]
    // },

    //Pages
    // {
    //     path: 'pages',
    //     data: {
    //         title: 'Pages '
    //     },
    //     children: [
    //         {
    //             path: '',
    //             redirectTo: '/dashboard',
    //             pathMatch: 'full'
    //         },
    //         {
    //             path: '',
    //             loadChildren: () => import('../../pages/pages.module').then(m => m.PagesModule)
    //         },
    //     ]
    // }
];