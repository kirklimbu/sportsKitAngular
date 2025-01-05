import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  public transform(value: any, keys: string, term?: string) {

    if (!keys) {
      return value;
    }
    return value.filter((data: { [x: string]: string }) =>
      this.matchValue(data, keys),
    );
  }

  private matchValue(data: { [x: string]: string }, value: string | RegExp) {
    return Object.keys(data)
      .map((key) => {
        return new RegExp(value, 'gi').test(data[key]);
      })
      .some((result) => result);
  }
}
