import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzInputModule } from 'ng-zorro-antd/input';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  Observable,
  shareReplay,
  startWith,
  switchMap,
  tap,
} from 'rxjs';
import { TournamentService } from '../tournament/data/tournament.service';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { MessageService } from 'src/app/shared/util-logger/message.service';

@Component({
  selector: 'app-registration-verification',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzCardModule,
    NzImageModule,
    NzIconModule,
    NzFormModule,
    NzInputModule,
    NzEmptyModule,
    NzAvatarModule,
    NzDividerModule,
  ],
  templateUrl: './registration-verification.html',
  styleUrl: './registration-verification.scss',
})
// player registration verification
export class RegistrationVerification implements OnInit {
  data$!: Observable<any[]>;
  searchControl = new FormControl('', { nonNullable: true });
  private placesService = inject(TournamentService);
  private readonly messageService = inject(MessageService);

  ngOnInit(): void {
    this.data$ = this.searchControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      map((v: string) => v?.trim()), // trim whitespace
      filter((v: string) => !!v && v.length === 10), // only call API if 10 digits
      switchMap((mobile: string) =>
        this.placesService.verifyRegistration(mobile)
      ),
      tap((res: any) => {
        // Show success message
        if (res?.message) {
          this.messageService.createMessage('success', res.message);
        }
      }),
      map((res: any) => res.tournamentList || []), // extract only tournamentList
      shareReplay(1)
    );
  }
}
