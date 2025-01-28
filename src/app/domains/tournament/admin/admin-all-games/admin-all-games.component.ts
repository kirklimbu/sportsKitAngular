import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, ParamMap, RouterModule } from '@angular/router';
import { Observable, distinctUntilChanged, map, shareReplay } from 'rxjs';
import { TournamentService } from '../../data/tournament.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpaceModule } from 'ng-zorro-antd/space';


import { IGame2DTO } from '../../data/model/tournament.model';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NgxPrintModule } from 'ngx-print';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';

@Component({
  selector: 'app-admin-all-games',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    // third-party
    NzButtonModule,
    NzIconModule,
    NzPageHeaderModule,
    NzSpaceModule,
    NzSelectModule,
    NzToolTipModule,
    NzListModule,
    NzCardModule,
    NzFlexModule,
    NzGridModule,
    NgxPrintModule,
    NzDescriptionsModule
  ],
  templateUrl: './admin-all-games.component.html',
  styleUrl: './admin-all-games.component.scss'
})
export class AdminAllGamesComponent {

  // https://bwfworldtour.bwfbadminton.com/player/61444/kim-won-ho/tournament-results


  tournamentId!: number;
  form!: FormGroup;

  id$!: Observable<number>;
  roundList$!: Observable<number[]>;
  data$!: Observable<IGame2DTO[]>;


  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly unsubscribe$ = inject(DestroyRef);
  private readonly tournamentService = inject(TournamentService);

  ngOnInit() {
    this.initForm();
    this.checkFormStatus();

  }

  private initForm() {
    this.form = this.fb.group({
      tournamentId: [0],
    })

    const id = this.form.controls['tournamentId']
    id.valueChanges
      .pipe(distinctUntilChanged(),
        shareReplay({ bufferSize: 1, refCount: true }),
        takeUntilDestroyed(this.unsubscribe$))
      .subscribe(value => {
        this.onSearch(this.tournamentId,value);
      });

  }


  private getRoundList(id: number) {
    this.roundList$ = this.tournamentService.getAdminRounds(id)

  }



  private checkFormStatus() {
    this.id$ = this.route.queryParamMap.pipe(
      map((params: ParamMap) => {
        const id = Number(params.get('id'))
        this.tournamentId = id

        return id
      })
    );
    this.id$.pipe(takeUntilDestroyed(this.unsubscribe$))
      .subscribe((_res: number) => {
        console.log('fomn res', _res);
        if (!_res) return;
        this.getRoundList(_res)
      });
  }

  onSearch(tournamentId: number,round?:number) {
this.data$=this.tournamentService.getAdminGames(tournamentId,round)
  
  // Start from ui
  
  }

}
