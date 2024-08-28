import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'youtubeLinkPipe',
  standalone: true,
})
export class YoutubeLinkPipe implements PipeTransform {
  transform(subDetail: string): string {
    // console.log(subDetail);

    // mobile
    const siIndex = subDetail.indexOf('?si=');

    if (siIndex !== -1) {
      const match = subDetail.match(/https:\/\/youtu\.be\/([^?&]+)/);
      return match ? match[1] : '';
    }


    // web
    // https://www.youtube.com/watch?v=or9oSMDqcDU
    const regex =
      /^https?:\/\/(?:www\.)?youtube\.com\/(?:watch\?v=|embed\/|v\/|)([^&\s]+)/;
    const match = subDetail.match(regex);

    if (match && match[1]) {

      subDetail = match[1];
      console.log('web match', subDetail);
      return subDetail;
    }

    console.log('final', subDetail);

    return subDetail
  }
}
