import { Component, Input } from '@angular/core';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { CountUpDirective } from 'src/app/shared/util-common/directives/count-up.directive';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-members',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NzStatisticModule,
    NzGridModule,
    NzButtonModule,
    NzTypographyModule,
    CountUpDirective
  ],
  templateUrl: './members.component.html',
  styleUrl: './members.component.scss'
})
export class MembersComponent {

  @Input() data: any

  scrollTo(elem: string) {
    console.log(elem);
    document?.querySelector(elem)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
