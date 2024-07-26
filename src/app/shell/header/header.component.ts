import { Component, DestroyRef, Input, OnInit, inject } from '@angular/core';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';

import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzListModule } from 'ng-zorro-antd/list';
import { RouterModule } from '@angular/router';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ThemeConstantService } from 'src/app/shared/services/theme-constant.service';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { HomeService } from 'src/app/domains/home/home.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

@Component({
    standalone: true,
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],

    imports: [
        // ng
        RouterModule,
        CommonModule,

        NgOptimizedImage,
        // third-party
        NzAvatarModule,
        NzDrawerModule,
        NzBadgeModule,
        NzDropDownModule,
        NzListModule,
        NzIconModule,
        NzBreadCrumbModule,
        NzButtonModule,
        // PerfectScrollbarModule,
        NzLayoutModule,
        NzTypographyModule
        // project


    ],

})

export class HeaderComponent {

    searchVisible = false;
    quickViewVisible = false;
    isFolded!: boolean;
    isExpand!: boolean;
    size = '12px'


    @Input() data!: any

    // private themeService = inject(ThemeConstantService)

    private readonly destroyRef = inject(DestroyRef);
    private homeService = inject(HomeService)
    // private store = inject(Store)





    searchToggle(): void {
        this.searchVisible = !this.searchVisible;
    }

    quickViewToggle(): void {
        this.quickViewVisible = !this.quickViewVisible;
    }

    notificationList = [
        {
            title: 'You received a new message',
            time: '8 min',
            icon: 'mail',
            color: 'ant-avatar-' + 'blue'
        },
        {
            title: 'New user registered',
            time: '7 hours',
            icon: 'user-add',
            color: 'ant-avatar-' + 'cyan'
        },
        {
            title: 'System Alert',
            time: '8 hours',
            icon: 'warning',
            color: 'ant-avatar-' + 'red'
        },
        {
            title: 'You have a new update',
            time: '2 days',
            icon: 'sync',
            color: 'ant-avatar-' + 'gold'
        }
    ];


    scrollTo(elem: string) {
        console.log(elem);
        document?.querySelector(elem)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}
