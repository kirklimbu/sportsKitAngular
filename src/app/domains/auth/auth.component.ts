import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AddUserComponent } from '../user/add-user/add-user.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CommonModule,
    // RouterModule
    AddUserComponent,
  ],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {}
