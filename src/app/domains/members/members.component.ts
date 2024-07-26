import { Component, Input } from '@angular/core';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

@Component({
  selector: 'app-members',
  standalone: true,
  imports: [
    CommonModule,
    NzStatisticModule,
    NzGridModule,
    NzButtonModule,
    NzTypographyModule
  ],
  templateUrl: './members.component.html',
  styleUrl: './members.component.scss'
})
export class MembersComponent {

  @Input() data: any

}
