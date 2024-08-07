import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
// third-party
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { FormsModule } from '@angular/forms';
import { IMember } from './data/models/member.model';
import { MemberService } from './data/services/member.service';
import { Observable } from 'rxjs';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { NzTagModule } from 'ng-zorro-antd/tag';
import { Router, RouterModule } from '@angular/router';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzInputModule } from 'ng-zorro-antd/input';


interface DataItem {
  name: string;
  age: number;
  address: string;
}

@Component({
  selector: 'app-all-members',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    NzTableModule,
    NzDropDownModule,
    NzAvatarModule,
    NzButtonModule,
    NzIconModule,
    NzTagModule,
    NzPageHeaderModule,
    NzSpaceModule,
    NzAutocompleteModule,
    NzInputModule
  ],
  templateUrl: './all-members.component.html',
  styleUrl: './all-members.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class AllMembersComponent implements OnInit {
  data$!: Observable<IMember[]>;



  private readonly memberService = inject(MemberService);
  private readonly cd = inject(ChangeDetectorRef);
  private readonly router = inject(Router);

  ngOnInit(): void {
    this.fetchMembers();
  }


  private fetchMembers(): void {
    this.data$ = this.memberService.getAllMembers();
  }



  onViewMore(id: number) {
    this.router.navigate(['/admin/user-profile'], { queryParams: { memberId: id } })
  }


}
