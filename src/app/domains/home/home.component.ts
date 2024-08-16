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

import {
  trigger,
  transition,
  style,
  animate,
  state,
} from '@angular/animations';
import { EventsComponent } from '../events/events.component';
import { OurLocationComponent } from '../our-location/our-location.component';
import { getDeviceId } from 'src/app/shared/util-common/generateDeviceId';
import { Store } from '@ngxs/store';
import { AuthState } from '../auth/login/state/login.state';
import { GallariesComponent } from '../gallaries/gallaries.component';
import { GlobalConstants } from 'src/app/shared/util-common/global-constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    SliderComponent,
    NzCarouselModule,
    NgOptimizedImage,
    AboutUsComponent,
    CoachesComponent,
    MembersComponent,
    OurLocationComponent,
    GallariesComponent,
    // VideosComponent,

    MembersComponent,
    EventsComponent,
  ],

})
export class HomeComponent implements OnInit {
  bannerData!: any;
  memberData!: any;
  eventData!: any;
  aboutUsData!: any;
  coachData!: any;
  companyInfo!: GlobalConstants

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
        content:
          'Valley Multi Education Network Consultancy in Kathmandu offers comprehensive services including EPS TOPIK preparation, study in Korea, study in Japan, and IELTS classes. Start your journey with us today!',
      },
      {
        name: 'keywords',
        content:
          'EPS TOPIK, study in Korea, study in Japan, IELTS classes, education consultancy, Kathmandu, Valley Multi Education Network, EPS TOPIK preparation, study abroad,Japanese/Korean language classes, Nepal',
      },
      { name: 'author', content: 'Valley Multi Education Network Consultancy' },
      { name: 'robots', content: 'index, follow' },
      {
        property: 'og:title',
        content:
          'Valley Multi Education Network Consultancy | EPS TOPIK, Study in Korea, Study in Japan, IELTS Classes in Kathmandu',
      },
      {
        property: 'og:description',
        content:
          'Valley Multi Education Network Consultancy in Kathmandu offers comprehensive services including EPS TOPIK preparation, study in Korea, study in Japan, and IELTS classes. Start your journey with us today!',
      },
      { property: 'og:image', content: 'URL_to_image' },
      { property: 'og:url', content: 'http://www.dmknamunabadmintonacademy.com/' },
      { property: 'og:type', content: 'website' },
    ]);

    // Structured data
    if (typeof window !== 'undefined') {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'EducationalOrganization',
        name: 'Damak Namuna Badminton Academy',
        url: 'https://www.valleymulti.com/home',
        logo: 'URL_to_logo',
        sameAs: [
          'https://www.facebook.com/valleymenc',
          'https://www.instagram.com/valleymenc/',
          'https://www.linkedin.com/company/valley-multi-education-network/',
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+977-9767223789 ',
          contactType: 'Customer Service',
        },
        description:
          'Valley Multi Education Network Consultancy in Kathmandu offers comprehensive services including EPS TOPIK preparation, study in Korea, study in Japan, and IELTS classes.',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Chabahill, Opposite to Chabahil stupa',
          addressLocality: 'Kathmandu',
          addressRegion: 'Bagmati',
          postalCode: '44600',
          addressCountry: 'NP',
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
      .getHomeContents(getDeviceId(), userId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res: any) => {
        // console.log(' res', res);
        this.aboutUsData = res.homeContentList[0];
        this.coachData = res.homeContentList[1];
        this.bannerData = res.bannerList;
        this.memberData = res.member;
        this.eventData = res.eventList.slice(0, 3);
      });
  }

  private fetchUserId(): number | undefined {
    const userId = this.store.selectSnapshot(AuthState.userId);
    return userId;
  }
}
