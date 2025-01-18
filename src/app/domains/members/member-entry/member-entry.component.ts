
import {
  Component,
  DestroyRef,
  inject,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { Observable, distinctUntilChanged, map, of, shareReplay, switchMap } from 'rxjs';
import {
  NzUploadFile,
  NzUploadModule,
} from 'ng-zorro-antd/upload';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { MessageService } from 'src/app/shared/util-logger/message.service';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { MemberService } from '../data/services/member.service';
import { IJobType, IMember, IMemberRequirementDto, IMembershipType, IPositionType } from '../data/models/member.model';
import { NepaliDatepickerModule, NepaliDatepickerService } from 'nepali-datepicker-angular';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TitleCaseDirective } from 'src/app/shared/util-common/directives/titleCase.directive';
import { CustomResponse } from 'src/app/shared/models/CustomResponse.model';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

const getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

@Component({
  selector: 'app-member-entry',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    // third-party
    NzUploadModule,
    NzModalModule,
    NzSelectModule,
    NzIconModule,
    NepaliDatepickerModule,
    NzTypographyModule,
    TitleCaseDirective
],
  templateUrl: './member-entry.component.html',
  styleUrl: './member-entry.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberEntryComponent implements OnInit {
  // props
  mode = 'add';
  previewImage: string | undefined = '';
  previewIDcard: string | undefined = '';
  previewVisible = false;
  showButton = true;
  fileList: any[] = [];
  idCardList: any[] = [];

  form!: FormGroup;
  hasError!: boolean;
  showPassword = false;
  showcPassword = false;

  memberShipType: IMembershipType[] = [];
  positionType: IPositionType[] = [];
  jobType: IJobType[] = [];

  memberRequirements$!: Observable<IMemberRequirementDto>;

  memberId$!: Observable<number>;
  member$!: Observable<any>;
  memberList$!: Observable<IMember[]>;
  isLoading$!: Observable<boolean>;
  date: any = null;
  issueDate: any = null;

  avatarUrl: string | undefined;
  idCard: string | undefined;
  loading = false;

  readonly bloodGroup = [
    'A+',
    'A-',
    'B+',
    'B-',
    'O+',
    'O-',
    'AB+',
    'AB-',
  ]

  private readonly _nepaliDatepickerService = inject(NepaliDatepickerService);
  private readonly memberService = inject(MemberService);
  private readonly unsubscribe$ = inject(DestroyRef);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly messageService = inject(MessageService);


  ngOnInit(): void {
    this.initForm();
    // console.log('0 initial form value', this.form.value);
    
    this.checkFormStatus();
  }
  // 

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  initForm():void {
     this.form = this.fb.group({
      memberId: [0],
      address: [],
      name: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      mobile1: ['', [Validators.required]],
      mobile2: [''],
      file: [],
      cardPic: [],
      cardPictemp: [],
      issueDate: [],
      bloodGroup: [],
      citizenShipNo: [],
      snNo: [],
      jobTypeId: [],
      positionTypeId: [],
      memberShipTypeId: [],
     })
    
    const id = this.form.controls['jobTypeId']
    id.valueChanges
      .pipe(distinctUntilChanged(),
        shareReplay({ bufferSize: 1, refCount: true }),
        takeUntilDestroyed(this.unsubscribe$))
      .subscribe(value => {
        console.log('valueChanges', value);
        this.resetValues();
        this.onChangeJob(value,'JOB_TYPE');    

      });

  }

  private checkFormStatus() {
    this.memberId$ = this.route.queryParamMap.pipe(
      map((params: ParamMap) => Number(params.get('id')))
    );
    this.memberId$.pipe(takeUntilDestroyed(this.unsubscribe$))
      .subscribe((_res: any) => {
        if (_res > 0) this.mode = 'edit';
        this.edit();
      });
  }


  profilePicUpload = (file: any): boolean => {

    this.form.patchValue({
      file: file
    });

    // to display the image
    this.getBase64(file, (img: string) => {
      this.loading = false;
      this.avatarUrl = img;
    });

    // this.cd.detectChanges();
    return false;
  };

  idCardUpload = (file: any): boolean => {

    this.form.patchValue({
      cardPictemp: file
    });

    // to display the image
    this.getBase64(file, (img: string) => {
      this.loading = false;
      this.idCard = img;
    });

    // this.cd.detectChanges();
    return false;
  };

  handleChange(type: string, info: { file: NzUploadFile }): void {
    console.log('handleChange info', type);


    switch (info.file.status) {
      case 'uploading':
        this.loading = true;
        break;
      case 'done':
        // Get this url from response in real world.
        this.getBase64(info.file!.originFileObj!, (img: string) => {
          this.loading = false;
          if (type === 'profilePic') {
            this.avatarUrl = img;
            this.form.patchValue({
              file: info
            });
            return
          }
          this.idCard = img;

          this.form.patchValue({
            cardPic: info
          });
        });
        break;
      case 'error':
        console.log('handel chg err');

        // this.msg.error('Network error');
        this.getBase64(info.file!.originFileObj!, (img: string) => {
          this.loading = false;
          if (type === 'profilePic') {
            this.avatarUrl = img;
            return
          }
          this.idCard = img;
        }); break;
    }

  }


  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      if (reader.result) {
        callback(reader.result.toString());
      }
    });
    reader.readAsDataURL(img);
  }

  handlePreview = async (file: NzUploadFile): Promise<void> => {
    console.log('file handel prreview', file);



    if (!file.url && !file['preview']) {
      if (file.originFileObj) {
        file['preview'] = await getBase64(file.originFileObj);
      }
    }
    this.previewImage = file.url || file['preview'];
    this.previewVisible = true;
  };

  // nepali date picker
  updateNepaliDate(type: string, $event: string) {
    if (type === 'dob') {
      this.form.patchValue({ dob: $event });
      return;
    }
    this.form.patchValue({ issueDate: $event });

  }
  updateEnglishDate($event: string) {
    console.log('updaet eng', $event);
  }
  onDateChange($event: string) {
    console.log('date', $event);
  }

  // save member
  onSave(): void {

    console.log('form value on save', this.form.value);
    
    this.memberService
      .saveMember(this.form.value)
      .pipe(takeUntilDestroyed(this.unsubscribe$))
      .subscribe((res: CustomResponse) => {
        this.messageService.createMessage(
          'success',
          res.message,
          7_000
        );
        this.router.navigate(['/admin/list-member'])
      });
  }

  edit() :void{
    this.member$ = this.memberId$.pipe(
      switchMap((query: number) => this.memberService.getFormValues(query))
    );
    this.member$
      .pipe(
        takeUntilDestroyed(this.unsubscribe$),
        shareReplay(1)
      
    )
      .subscribe((_res: any) => {
        console.log('1 res', _res);
        
        this.jobType = _res.jobTypeList
        this.positionType = _res.positionTypeList;
        this.memberShipType = _res.memberShipTypeList; 
        // console.log('2 form before pathch', this.form.value);

        this.form.patchValue(_res.form);
        // console.log('3 form after pathch', this.form.value);

        if (_res.form.memberId === 0) {
          this.fileList = []
          this.idCardList = []
          this.previewImage = _res.form.profilePic;
          this.previewIDcard = _res.form.cardPic;
          this.date = null;
          return;
          
        }

        this.form.patchValue(_res.form);

        this.fileList = [
          {
            traineeId: _res.form.traineeId,
            name: _res.form.name,
            status: 'done',
            url: _res.form.profilePic,
          },
        ];
        this.idCardList = [
          {
            traineeId: _res.form.traineeId,
            name: _res.form.name,
            status: 'done',
            url: _res.form.cardPic,
          },
        ];
        const BSDate = this._nepaliDatepickerService.BSToAD(
          _res.form.dob,
          'yyyy/mm/dd'
        );
        this.date = new Date(BSDate);
        const BSIssueDate = this._nepaliDatepickerService.BSToAD(
          _res.form.issueDate,
          'yyyy/mm/dd'
        );
        this.issueDate = new Date(BSIssueDate);
        // this.cd.detectChanges();
      });
   
  }
  //#TODO Reset dropdowns on job change

  onChangeJob(id: number, type: string): void {
    
    if (!id) return
  

    this.memberService
      .getMemberRequirements(id, type)
      .pipe(takeUntilDestroyed(this.unsubscribe$))
      .subscribe((res: IMemberRequirementDto) => {
        console.log('res', res);
        this.positionType = res.positionTypeList;
        this.memberShipType = res.memberShipTypeList;
       
      });
  }

  resetValues() {
    this.form.patchValue({
      positionTypeId: null,
      memberShipTypeId: null,
    });
    // this.form.get('positionTypeId')?.patchValue(0);
    // this.form.get('memberShipTypeId')?.patchValue(0);
  }

  compareFn = (o1: any, o2: any): boolean => (o1 && o2 ? o1.id === o2.id : o1 === o2);


}

