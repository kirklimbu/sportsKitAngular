import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Observable, combineLatest, map } from 'rxjs';
export interface ISEOContent {
  title: string;
  description: string;
  url: string;
  siteName: string;
  image?: string;
  imageWidth?: string;
  imageHeight?: string;
  imageType?: string;
  type?: string;
  twitterCard?: string;
}

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  public readonly defaultDescriptionTranslationKey = 'seo.description';
  public readonly siteNameTranslationKey = 'seo.siteName';

  public readonly defaultImageWidth = '1200';
  public readonly defaultImageHeight = '630';
  public readonly defaultImageType = 'image/jpeg';
  public readonly defaultType = 'website';
  public readonly defaultTwitterCard = 'summary_large_image';

  private readonly titleService = inject(Title);
  private readonly metaService = inject(Meta);
  // public readonly defaultImageUrl = urlJoin(
  //   this.environmentVariablesService.get(EnvironmentVariable.APP_URL),
  //   'assets',
  //   'images',
  //   'seo.jpg'
  // );
  environmentVariablesService: any;
  // private readonly translocoService: TranslocoService,
  // private readonly environmentVariablesService = inject(EnvironmentVariablesService<EnvironmentVariable>)
  constructor(
  ) {
  }


  public setMetaDescription(content: string) {
    this.metaService.updateTag({
      name: 'description',
      content: content,
    });
  }

  public setMetaTitle(title: string) {
    this.titleService.setTitle(title);
  }
  public setSEO({
    title,
    description,
    url,
    siteName,
    image,
    imageWidth,
    imageHeight,
    imageType,
    type,
    twitterCard,
  }: ISEOContent): void {
    // First remove all meta tags to eliminate checking for exiting ones.
    // Also benefit from deleting all is not to add meta tag when it is not provided for that page.
    this.removeAllMetaTags();

    // Set new meta tags
    this.setTitle(title, siteName);
    this.setDescription(description);
    this.setUrl(url);
    this.setSiteName(siteName);
    this.setImage(image);
    this.setImageWidth(imageWidth, image);
    this.setImageHeight(imageHeight, image);
    this.setImageType(imageType, image);
    this.setType(type);
    // this.setLocale();
    this.setTwitterCard(twitterCard);
  }

  // public createTranslatedSeoContent(
  //   title?: TranslateParams | undefined,
  //   description?: TranslateParams | undefined
  // ): Observable<{ title: string; description: string; siteName: string }> {
  //   const title$ = this.createTranslatedTitleObservable(title);
  //   const description$ = this.createTranslatedDescriptionObservable(description);
  //   const siteName$ = this.createTranslatedSiteNameObservable();

  //   return combineLatest([title$, description$, siteName$]).pipe(
  //     map(([title, description, siteName]) => ({ title, description, siteName }))
  //   );
  // }


  // public createTranslatedTitleObservable(title?: TranslateParams | undefined): Observable<string> {
  //   return this.translocoService.selectTranslate(title ?? '');
  // }

  // public createTranslatedDescriptionObservable(description?: TranslateParams | undefined): Observable<string> {
  //   return this.translocoService.selectTranslate(description ?? this.defaultDescriptionTranslationKey);
  // }

  // public createTranslatedSiteNameObservable(): Observable<string> {
  //   return this.translocoService.selectTranslate(this.siteNameTranslationKey);
  // }

  // private methods
  private setTitle(title: string | undefined, siteName: string): void {
    const titleContent = title ? `${title} | ${siteName}` : siteName;

    this.titleService.setTitle(titleContent);
    this.metaService.addTag({
      property: 'og:title',
      content: titleContent,
    });
  }

  private setDescription(description: string): void {
    this.metaService.addTag({
      name: 'description',
      content: description,
    });
    this.metaService.addTag({
      property: 'og:description',
      content: description,
    });
  }

  private setUrl(url: string): void {
    this.metaService.addTag({
      property: 'og:url',
      content: url,
    });
  }

  private setSiteName(siteName: string): void {
    this.metaService.addTag({
      property: 'og:site_name',
      content: siteName,
    });
  }

  private setImage(image: string | undefined): void {
    if (!image) {
      this.setDefaultImage();
      return;
    }
    this.metaService.addTag({ property: 'og:image', content: image });
  }

  private setImageWidth(imageWidth: string | undefined, image: string | undefined): void {
    if (imageWidth && image) {
      this.metaService.addTag({ property: 'og:image:width', content: imageWidth });
    }
  }

  private setImageHeight(imageHeight: string | undefined, image: string | undefined): void {
    if (imageHeight && image) {
      this.metaService.addTag({ property: 'og:image:height', content: imageHeight });
    }
  }

  private setImageType(imageType: string | undefined, image: string | undefined): void {
    if (imageType && image) {
      this.metaService.addTag({ property: 'og:image:type', content: imageType });
    }
  }

  private setDefaultImage(): void {
    // this.metaService.addTag({ property: 'og:image', content: this.defaultImageUrl });
    this.metaService.addTag({ property: 'og:image:width', content: this.defaultImageWidth });
    this.metaService.addTag({ property: 'og:image:height', content: this.defaultImageHeight });
    this.metaService.addTag({ property: 'og:image:type', content: this.defaultImageType });
  }

  private setType(type: string | undefined): void {
    this.metaService.addTag({ property: 'og:type', content: type ?? this.defaultType });
  }

  // private setLocale(): void {
  //   this.metaService.addTag({
  //     property: 'og:locale',
  //     content: languageToLocale(this.translocoService.getActiveLang() as Language),
  //   });
  // }

  private setTwitterCard(type: string | undefined): void {
    this.metaService.addTag({ name: 'twitter:card', content: type ?? this.defaultTwitterCard });
  }

  private removeAllMetaTags(): void {
    this.metaService.removeTag('property="og:title"');
    this.metaService.removeTag('name="description"');
    this.metaService.removeTag('property="og:description"');
    this.metaService.removeTag('property="og:url"');
    this.metaService.removeTag('property="og:site_name"');
    this.metaService.removeTag('property="og:image"');
    this.metaService.removeTag('property="og:image:width"');
    this.metaService.removeTag('property="og:image:height"');
    this.metaService.removeTag('property="og:image:type"');
    this.metaService.removeTag('property="og:type"');
    this.metaService.removeTag('property="og:locale"');
    this.metaService.removeTag('name="twitter:card"');
  }
}

function urlJoin(arg0: any, arg1: string, arg2: string, arg3: string) {
  throw new Error('Function not implemented.');
}
