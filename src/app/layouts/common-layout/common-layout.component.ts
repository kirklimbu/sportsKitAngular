import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from "@angular/router";
import { Observable } from "rxjs";
import { distinctUntilChanged, filter, map, startWith } from "rxjs/operators";
// project
// import { IBreadcrumb } from 'src/app/shared/interfaces/breadcrumb.type';
// import { ThemeConstantService } from 'src/app/shared/services/theme-constant.service';
import { FooterComponent } from 'src/app/shell/footer/footer.component';
import { HeaderComponent } from 'src/app/shell/header/header.component';
// third-party
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { HeaderTopComponent } from 'src/app/shell/header-top/header-top.component';
import { NavbarComponent } from 'src/app/shell/navbar/navbar.component';
import { ScrollToTopComponent } from 'src/app/shared/ui-common/scroll-to-top/scroll-to-top.component';
// import { FbMessengerComponent } from 'src/app/shared/ui-common/fb-messenger/fb-messenger.component';
// import { WhatsappMessengerComponent } from 'src/app/shared/ui-common/whatsapp-messenger/whatsapp-messenger.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HomeService } from 'src/app/domains/home/home.service';
import { en_US, ne_NP, NzI18nService, provideNzI18n } from 'ng-zorro-antd/i18n';

import { getDeviceId } from 'src/app/shared/util-common/generateDeviceId';
import { Store } from '@ngxs/store';
import { AuthState } from 'src/app/domains/auth/login/state/login.state';



@Component({
    standalone: true,
    selector: 'app-common-layout',
    templateUrl: './common-layout.component.html',
    styleUrls: ['./common-layout.component.scss'],
    imports: [
        RouterModule,
        CommonModule,
        // third-party
        NzBreadCrumbModule,
        // project
        HeaderTopComponent,
        NavbarComponent,
        HeaderComponent,
        FooterComponent,
        ScrollToTopComponent,
        NzLayoutModule,
        ScrollToTopComponent
        // FbMessengerComponent,
        // WhatsappMessengerComponent
    ],
    providers: [
        // ThemeConstantService


    ]
})

export class CommonLayoutComponent implements OnInit {

    // breadcrumbs$!: Observable<IBreadcrumb[]>;
    contentHeaderDisplay!: string;
    isFolded!: boolean;
    isSideNavDark!: boolean;
    isExpand!: boolean;
    selectedHeaderColor!: string;
    footerData: any;
    headerData: any;
    bannerData: any;
    headerTopData: any
    eventData: any
    private readonly destroyRef = inject(DestroyRef);
    private readonly i18n = inject(NzI18nService)
    private homeService = inject(HomeService)
    private readonly store = inject(Store);

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        // private themeService: ThemeConstantService
    ) {
        this.switchLanguage()

        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd),
            map(() => {
                let child = this.activatedRoute.firstChild;
                while (child) {
                    if (child.firstChild) {
                        child = child.firstChild;
                    } else if (child.snapshot.data && child.snapshot.data['headerDisplay']) {
                        return child.snapshot.data['headerDisplay'];
                    } else {
                        return null;
                    }
                }
                return null;
            })
        ).subscribe((data: any) => {
            this.contentHeaderDisplay = data;
        });
    }

    ngOnInit() {
        this.fetchHomeContents()
        // this.breadcrumbs$ = this.router.events.pipe(
        //     startWith(new NavigationEnd(0, '/', '/')),
        //     filter(event => event instanceof NavigationEnd), distinctUntilChanged(),
        //     map(data => this.buildBreadCrumb(this.activatedRoute.root))
        // );
        // this.themeService.isMenuFoldedChanges.subscribe(isFolded => this.isFolded = isFolded);
        // this.themeService.isSideNavDarkChanges.subscribe(isDark => this.isSideNavDark = isDark);
        // this.themeService.selectedHeaderColor.subscribe(color => this.selectedHeaderColor = color);
        // this.themeService.isExpandChanges.subscribe(isExpand => this.isExpand = isExpand);
    }


    private fetchHomeContents() {
        const userId = this.fetchUserId();

        this.homeService.getHomeContents(getDeviceId(), userId)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((res: any) => {
                this.headerTopData = res.organization
                this.headerData = res.organization
                this.footerData = res.organization
                // this.setContents(res)
            });
    }

    private fetchUserId(): number | undefined {
        const userId = this.store.selectSnapshot(AuthState.userId);
        return userId;
    }

    switchLanguage() {
        // console.log('switch lang');

        // this.i18n.setLocale(ne_NP);
    }

    // private buildBreadCrumb(route: ActivatedRoute, url = '', breadcrumbs: IBreadcrumb[] = []): IBreadcrumb[] {
    //     let label = '', path = '/';

    //     if (route.routeConfig) {
    //         if (route.routeConfig.data) {
    //             label = route.routeConfig.data['title'];
    //             path += route.routeConfig.path;
    //         }
    //     } else {
    //         label = 'Dashboard';
    //         path += 'dashboard';
    //     }

    //     const nextUrl = path && path !== '/dashboard' ? `${url}${path}` : url;
    //     const breadcrumb = <IBreadcrumb>{
    //         label: label, url: nextUrl
    //     };

    //     const newBreadcrumbs = label ? [...breadcrumbs, breadcrumb] : [...breadcrumbs];
    //     if (route.firstChild) {
    //         return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
    //     }
    //     return newBreadcrumbs;
    // }
}