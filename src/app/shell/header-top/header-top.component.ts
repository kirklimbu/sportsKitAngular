import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// third-party
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
// project
import { GlobalConstants } from 'src/app/shared/util-common/global-constants';


@Component({
  selector: 'app-header-top',
  standalone: true,
  imports: [CommonModule,
    // third-party
    NzIconModule,
    NzMenuModule,
    NzAvatarModule
  ],
  templateUrl: './header-top.component.html',
  styleUrls: ['./header-top.component.scss']
})
export class HeaderTopComponent implements OnInit {
  url = '/assets/data/pages/company_info.json';

  headerData = GlobalConstants
  info$!: Observable<any>;
  @Input() notificationCount!: number
  @Input() imgUrl!: string;
  @Input() data: any;



  private httpClient!: HttpClient;

  private handler = inject(HttpBackend)
  constructor() {
    this.httpClient = new HttpClient(this.handler)
  }

  ngOnInit(): void {
    this.fetchInfo()
  }

  fetchInfo() {
    this.info$ = this.httpClient.get<any>(this.url)
  }
}
