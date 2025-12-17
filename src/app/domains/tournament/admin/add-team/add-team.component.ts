import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import {
  Observable,
  distinctUntilChanged,
  filter,
  map,
  shareReplay,
} from 'rxjs';
import { MessageService } from 'src/app/shared/util-logger/message.service';
// third-party
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { BsDateInputDirective } from 'src/app/shared/util-common/directives/bs-date-input.directive';
import { TournamentService } from '../../data/tournament.service';
import { IPlace1Dto } from 'src/app/domains/famous-places/data/model/famous-places';
import { IReference1Dto } from '../../data/model/tournament.model';
import {
  NzUploadChangeParam,
  NzUploadFile,
  NzUploadModule,
} from 'ng-zorro-antd/upload';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { CustomResponse } from 'src/app/shared/models/CustomResponse.model';

@Component({
  selector: 'app-add-team',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // third-party
    NzPageHeaderModule,
    NzCheckboxModule,
    NzFormModule,
    NzSelectModule,
    NzCardModule,
    NzInputModule,
    NzButtonModule,
    NzUploadModule,
    // project
    BsDateInputDirective,
  ],
  templateUrl: './add-team.component.html',
  styleUrl: './add-team.component.scss',
})
export class AddTeamComponent implements OnInit {
  // props
  tournamentId!: number;
  id$!: Observable<number>;
  form!: FormGroup;
  mode = 'add';

  hotelList!: IPlace1Dto[];
  genderList!: IReference1Dto[];
  // payment receipt upload
  previewImage: string | undefined = '';
  avatarUrl: string | undefined;
  uploading = false;
  previewVisible = false;
  fileList: any[] = [];
  apiUrl = environment.apiUrl;
  previewUrl: string | null = null;
  private lastKey = '';

  private router = inject(Router);
  private readonly http = inject(HttpClient);
  private readonly fb = inject(FormBuilder);
  private readonly tournamentService = inject(TournamentService);
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef$ = inject(DestroyRef);
  private readonly messageService = inject(MessageService);

  constructor() {
    effect(() => {
      const { tournamentId, teamId } = this.idsSignal();
      const key = `${tournamentId}-${teamId}`;

      if (!tournamentId || this.lastKey === key) return;

      this.lastKey = key;

      this.tournamentService
        .getFormValues(tournamentId, teamId)
        .pipe(takeUntilDestroyed(this.destroyRef$))
        .subscribe((_res) => {
          console.log('res form', _res);
          this.genderList = _res.genderList;
          this.hotelList = _res.placeList;

          this.form.patchValue(_res.form);
        });
    });
  }

  queryParamMapSignal = toSignal(this.route.queryParamMap, {
    initialValue: this.route.snapshot.queryParamMap,
  });

  idsSignal = computed(() => {
    const params = this.queryParamMapSignal();

    return {
      tournamentId: Number(params?.get('tournamentId') ?? 0),
      teamId: Number(params?.get('teamId') ?? 0),
    };
  });

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.form = this.fb.group({
      teamId: [],
      tournamentId: [],
      playerOneId: [0],
      playerOneName: [''],
      playerOneDobBs: [''],
      playerTwoDobBs: [''],
      playerTwoId: [0],
      playerTwoName: [],
      playerOneGenderId: [],
      playerTwoGenderId: [],
      playerOneMobile: [],
      playerTwoMobile: [],
      playerOnePlaceId: [],
      playerTwoPlaceId: [],
      address: [],
      teamName: [],
      paymentDocPath: [],
      hasPaid: [false],
    });
  }

  // private checkFormStatus() {
  //   const { tournamentId, teamId } = this.idsSignal();
  //   console.log('ids', tournamentId, teamId);
  //   this.tournamentService
  //     .getFormValues(tournamentId, teamId)
  //     .pipe(takeUntilDestroyed(this.destroyRef$))
  //     .subscribe((_res) => {
  //       console.log('res form', _res);
  //       this.genderList = _res.genderList;
  //       this.hotelList = _res.placeList;

  //       this.form.patchValue(_res.form);
  //     });
  // }

  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    console.log(this.fileList, 'fileList');
    this.form.patchValue({ paymentDocPath: this.fileList[0] });

    // Create local preview
    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result as string;
    };
    reader.readAsDataURL(file as any);
    return false;
  };

  handleUpload(): void {
    console.log(this.form.value, 'form');
    if (this.uploading) return;
    const { paymentDocPath, ...teamWithoutDoc } = this.form.value; // destructure to remove doc

    const formData = new FormData();
    formData.append('form', JSON.stringify(teamWithoutDoc));
    formData.append('file', paymentDocPath);
    this.uploading = true;

    // // You can use any AJAX library you like
    const req = new HttpRequest(
      'POST',
      `${this.apiUrl}tournament/registration/save`,
      formData
    );
    this.http
      .request(req)
      .pipe(
        filter(
          (e): e is HttpResponse<CustomResponse> => e instanceof HttpResponse
        ),
        takeUntilDestroyed(this.destroyRef$),
        shareReplay(1)
      )
      .subscribe({
        next: (res) => {
          this.uploading = false;
          this.fileList = [];
          this.messageService.createMessage(
            'success',
            res.body?.message ?? 'Successfully added your team.'
          );
          this.router.navigate(['/admin/tournament']);
        },
        error: (res) => {
          this.uploading = false;
          this.messageService.createMessage('error ', res.message);
        },
      });
  }

  handleChange(info: NzUploadChangeParam): void {
    if (info.file.status === 'removed') {
      this.fileList = [];
      this.previewUrl = null;
    }
    let fileList = [...info.fileList];

    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    fileList = fileList.slice(0);

    // 2. Read from response and show file link
    fileList = fileList.map((file) => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      return file;
    });

    this.fileList = fileList;
  }
}
