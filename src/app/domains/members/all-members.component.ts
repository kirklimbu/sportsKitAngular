import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
// third-party
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { FormsModule } from '@angular/forms';
import { IMember } from './data/models/member.model';
import { MemberService } from './data/services/member.service';
import { Observable } from 'rxjs';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';

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
    NzAvatarModule
  ],
  templateUrl: './all-members.component.html',
  styleUrl: './all-members.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllMembersComponent implements OnInit, OnChanges {

  @Input() data$!: Observable<IMember[]>
  searchValue = '';
  visible = false;
  listOfData: DataItem[] = [
    {
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park'
    },
    {
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park'
    },
    {
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park'
    },
    {
      name: 'Jim Red',
      age: 32,
      address: 'London No. 2 Lake Park'
    }
  ];
  listOfDisplayData = [...this.listOfData];

  private readonly memberService = inject(MemberService)
  private readonly cd = inject(ChangeDetectorRef)

  ngOnInit(): void {

    if (!this.data$) this.fetchMembers()
  }

  ngOnChanges(): void {
    console.log('data', this.data$);
    if (!this.data$) this.fetchMembers()

    this.data$ = this.data$
    this.cd.detectChanges();
  }

  private fetchMembers(): void {
    this.data$ = this.memberService.getAllMembers()

  }
  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.listOfData.filter((item: DataItem) => item.name.indexOf(this.searchValue) !== -1);
  }
}
