import {
  Component,
  DestroyRef,
  Input,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { SliderComponent } from './slider/slider.component';

// import { WhyUsComponent } from '../why-us/why-us.component';
// import { StudyDestinationsComponent } from '../study-destinations/study-destinations.component';
// import { OurLocationComponent } from '../our-location/our-location.component';
// import { GallaryComponent } from '../gallary/gallary.component';
// import { VideosComponent } from '../videos/videos.component';
import { Meta, Title } from '@angular/platform-browser';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HomeService } from './home.service';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NgOptimizedImage } from '@angular/common';
import { AboutUsComponent } from '../about-us/about-us.component';
import { CoachesComponent } from '../coaches/coaches.component';
import { MembersComponent } from '../members/members.component';
import { EventsComponent } from '../events/events.component';
import { OurLocationComponent } from '../our-location/our-location.component';
import { getClientId } from 'src/app/shared/util-common/generateDeviceId';
import { Store } from '@ngxs/store';
import { AuthState } from '../auth/login/state/login.state';
import { GallariesComponent } from '../gallaries/gallaries.component';
import { GlobalConstants } from 'src/app/shared/util-common/global-constants';
import { IOrganization } from '../admin/organization/data/models/organization/organization.model';
import { LazyImgDirective } from 'src/app/shared/util-common/directives/lazyImage/lazyImage.directive';
import { NzImageModule } from 'ng-zorro-antd/image';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    NzImageModule,
    NzCarouselModule,
    NgOptimizedImage,
    SliderComponent,
    AboutUsComponent,
    CoachesComponent,
    MembersComponent,
    OurLocationComponent,
    GallariesComponent,
    // VideosComponent,
    MembersComponent,
    EventsComponent,
    LazyImgDirective,
  ],
})
export class HomeComponent implements OnInit {
  bannerData!: any;
  memberData!: any;
  eventData!: any;
  aboutUsData!: any;
  coachData!: any;
  locationData!: IOrganization;

  private readonly titleService = inject(Title);
  private readonly metaService = inject(Meta);

  private readonly destroyRef = inject(DestroyRef);
  private readonly homeService = inject(HomeService);
  private readonly store = inject(Store);

  ngOnInit(): void {
    this.titleService.setTitle('DNB Academy');
    this.metaService.addTags([
      {
        name: 'description',
        content: GlobalConstants.SEOdescription,
      },
      {
        name: 'keywords',
        content: GlobalConstants.SEOkeywords,
      },
      { name: 'author', content: GlobalConstants.appTitle },
      { name: 'robots', content: 'index, follow' },
      {
        property: 'og:title',
        content: GlobalConstants.appTitle,
      },
      {
        property: 'og:description',
        content: GlobalConstants.SEOdescription,
      },
      { property: 'og:image', content: GlobalConstants.appLogo },
      { property: 'og:url', content: GlobalConstants.website },
      { property: 'og:type', content: 'website' },
    ]);

    // Structured data
    if (typeof window !== 'undefined') {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Badminton Academy',
        name: GlobalConstants.appTitle,
        url: GlobalConstants.website,
        logo: GlobalConstants.appLogo,
        sameAs: [GlobalConstants.facebook],
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: GlobalConstants.MOBILE,
          contactType: 'Inquiry',
        },
        description: GlobalConstants.SEOdescription,
        address: {
          '@type': 'PostalAddress',
          streetAddress: GlobalConstants.STREET_ADDRESS,
          addressLocality: GlobalConstants.ADDRESS_LOCALITY,
          addressRegion: GlobalConstants.ADDRESS_REGION,
          postalCode: GlobalConstants.POSTAL_CODE,
          addressCountry: GlobalConstants.ADDRESS_COUNTRY,
        },
        areaServed: 'Nepal',
      });
      document.head.appendChild(script);
    }
    this.fetchHomeContents();
  }

  private fetchHomeContents() {
    const userId = this.fetchUserId();

    this.homeService
      .getHomeContents(getClientId(), userId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res: any) => {
        // console.log(' res', res);
        this.aboutUsData = res.homeContentList[0];
        this.coachData = res.homeContentList[1];
        this.bannerData = res.bannerList;
        this.memberData = res.memberShip;
        this.locationData = res.organization;
        this.eventData = res.eventList.slice(0, 3);
      });
  }

  private fetchUserId(): number | undefined {
    const userId = this.store.selectSnapshot(AuthState.userId);
    return userId;
  }
}
