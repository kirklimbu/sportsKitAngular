import { Component, DestroyRef, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, distinctUntilChanged, map, shareReplay } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MessageService } from 'src/app/shared/util-logger/message.service';
import { CommonModule } from '@angular/common';
// third-party
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { TournamentService } from '../../data/tournament.service';

@Component({
  selector: 'app-add-team',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // third-party
    NzPageHeaderModule,
    NzCheckboxModule

  ],
  templateUrl: './add-team.component.html',
  styleUrl: './add-team.component.scss'
})
export class AddTeamComponent {

  // props
  tournamentId!: number;
  id$!: Observable<number>;
  form!: FormGroup;
  mode='add'
  private readonly fb = inject(FormBuilder);
  private readonly tournamentService = inject(TournamentService);
  private readonly route = inject(ActivatedRoute);
  private readonly unsubscribe$ = inject(DestroyRef);
  private readonly messageService = inject(MessageService);

  ngOnInit(): void {
    this.buildForm();
    this.checkFormStatus();

  }

  private buildForm(): void {
    this.form = this.fb.group({
      tournamentId: [],
      playerOneId: [0],
      playerOneName: [''],
      playerTwoId: [0],
      playerTwoName: [],
      address: [],
      hasPaid: [false],
    })
  }



  private checkFormStatus() {
    this.id$ = this.route.queryParamMap.pipe(
      map((params: ParamMap) => {
        const tournamentId = Number(params.get('id'));
        this.tournamentId = tournamentId;
        return tournamentId;
      })
    );
    this.id$
      .pipe(
        distinctUntilChanged(),
        shareReplay(1),
        takeUntilDestroyed(this.unsubscribe$)
      )
      .subscribe((_res: any) => {
        this.form.patchValue({ tournamentId: _res })
      });
  }


  // save data
  onSave() {

    this.tournamentService
      .saveTeam(this.form.value)
      .pipe(takeUntilDestroyed(this.unsubscribe$))
      .subscribe((_res: any) => {
        if (_res) {
          this.messageService.createMessage('success', _res.message);
          this.form.reset();
          console.log('tournament id', this.tournamentId);
          
          this.form.patchValue({ tournamentId: this.tournamentId })

        }
      });
  }
}



