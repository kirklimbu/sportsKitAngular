import { Component, OnInit, inject } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { IMember } from '../data/models/member.model';
import { MemberService } from '../data/services/member.service';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NepaliDateFormatterPipe } from "../../../shared/util-common/pipes/nepali-date-formatter.pipe";

@Component({
  selector: 'app-total-members',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage,
    NzCardModule,
    NzGridModule,
    NzIconModule,
    NzBadgeModule,
    NzToolTipModule,
    // project
    NepaliDateFormatterPipe
],
  templateUrl: './total-members.component.html',
  styleUrl: './total-members.component.scss'
})
export class TotalMembersComponent implements OnInit {



  data$!: Observable<IMember[]>;
  data: any
  private readonly memberService = inject(MemberService);

  ngOnInit(): void {
    this.fetchMembers()
  }



  private fetchMembers(): void {
    // this.data$ = this.memberService.getAllMembers()
    this.data$ = this.memberService.getAllMembers()
      .pipe(
        shareReplay({ bufferSize: 1, refCount: true }))

  }
}
