import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
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

interface DataItem {
  name: string;
  age: number;
  address: string;
}
@Component({
  selector: 'app-all-members',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzTableModule,
    NzDropDownModule,
    NzAvatarModule,
    NzButtonModule,
    NzIconModule,
    NzTagModule,
  ],
  templateUrl: './all-members.component.html',
  styleUrl: './all-members.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AllMembersComponent implements OnInit, OnChanges {
  @Input() data$!: Observable<IMember[]>;

  private readonly memberService = inject(MemberService);
  private readonly cd = inject(ChangeDetectorRef);

  ngOnInit(): void {
    if (!this.data$) this.fetchMembers();
  }

  ngOnChanges(): void {
    console.log('data', this.data$);
    if (!this.data$) this.fetchMembers();

    // eslint-disable-next-line no-self-assign
    this.data$ = this.data$;
    this.cd.detectChanges();
  }

  private fetchMembers(): void {
    this.data$ = this.memberService.getAllMembers();
  }

  onAdd() {
    // if (!this.form.controls['setMasterId'].value) return this.messageService.createMessage('error', 'Set is missing. Please select set.')
    // this.router.navigate(['/auth/question-add'], { queryParams: { setMasterId: this.form.controls['setMasterId'].value } })
  }

  onEdit(id: number) {
    // this.router.navigate(['/auth/question-add'], { queryParams: { id: id, setMasterId: this.form.controls['setMasterId'].value } })
  }
  // reset(): void {
  //   this.searchValue = '';
  //   this.search();
  // }

  // search(): void {
  //   this.visible = false;
  //   this.listOfDisplayData = this.listOfData.filter((item: DataItem) => item.name.indexOf(this.searchValue) !== -1);
  // }
}
