import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  inject
} from '@angular/core';
// third-party
import { FormsModule } from '@angular/forms';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';
import { Observable, shareReplay } from 'rxjs';
import { IMember } from './data/models/member.model';
import { MemberService } from './data/services/member.service';

import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngxs/store';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { Role } from 'src/app/shared/util-auth/models/user.model';
import { SearchPipe } from 'src/app/shared/util-common/pipes/search.pipe';
import { AuthState } from '../auth/login/state/login.state';


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
    NzInputModule,
    SearchPipe
  ],
  templateUrl: './all-members.component.html',
  styleUrl: './all-members.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class AllMembersComponent implements OnInit {

  // props
  userRole: Role | undefined
  data: any

  searchValue = '';
  data$!: Observable<IMember[]>;
  listOfColumn = [
    {
      title: 'Sn. No.',
      compare: (a: any, b: any) => a.snNo.localeCompare(b.snNo),
      priority: false,
    },
    {
      title: 'Name',
      compare: (a: any, b: any) => a.name.localeCompare(b.name),
      priority: false,
    },
  ];


  private readonly memberService = inject(MemberService);
  private readonly cd = inject(ChangeDetectorRef);
  private readonly router = inject(Router);
  private readonly store = inject(Store);

  ngOnInit(): void {
    this.checkUser();
    this.fetchMembers();
  }

  private checkUser(): void {
    this.userRole = this.store.selectSnapshot(AuthState.userRole);
  }

  private fetchMembers(): void {
    // this.data$ = this.memberService.getAllMembers()
    this.data$ = this.memberService.getAllMembers()
      .pipe(
        shareReplay({ bufferSize: 1, refCount: true }))

  }



  onViewMore(id: number): void {
    this.router.navigate(['/admin/user-profile'], { queryParams: { memberId: id } })
  }


}
