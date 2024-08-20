import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'youtubeLinkPipe',
  standalone: true,
})
export class YoutubeLinkPipe implements PipeTransform {
  transform(subDetail: string): string {
    // console.log(subDetail);

    const regex =
      /^https?:\/\/(?:www\.)?youtube\.com\/(?:watch\?v=|embed\/|v\/|)([^&\s]+)/;
    const match = subDetail.match(regex);

    if (match && match[1]) {
      // console.log(subDetail);

      subDetail = match[1];
      return subDetail;
    }
    // console.log(subDetail);

    return subDetail;
  }
}
