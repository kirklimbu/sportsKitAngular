import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from './data/model/user.model';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  @Input()
  data$!: Observable<IUser[]>;
}
