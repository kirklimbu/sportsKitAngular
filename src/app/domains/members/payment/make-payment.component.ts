import { ChangeDetectorRef, Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NepaliDatepickerModule, NepaliDatepickerService } from 'nepali-datepicker-angular';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { MessageService } from 'src/app/shared/util-logger/message.service';
import { MemberService } from '../data/services/member.service';
import { Observable, map, of, switchMap } from 'rxjs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IMember } from '../data/models/member.model';
import { IMemberPayment } from '../data/models/member-payment';


@Component({
  selector: 'app-make-payment',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    // third-party
    NzUploadModule,
    NzModalModule,
    NzSelectModule,
    NzIconModule,
    NepaliDatepickerModule,
    // project
  ],
  templateUrl: './make-payment.component.html',
  styleUrl: './make-payment.component.scss',
})
export class MakePaymentComponent {


  // props

  form!: FormGroup;
  mode = 'add'
  paymentList$!: Observable<IMemberPayment[]>
  date: any = new Date();

  paymentId$!: Observable<any>
  private readonly _nepaliDatepickerService = inject(NepaliDatepickerService);

  private readonly unsubscribe$ = inject(DestroyRef);
  public readonly messageService = inject(MessageService)
  public readonly memberService = inject(MemberService)
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly cd = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.initForm();
    this.checkFormStatus()
  }



  initForm(): FormGroup {
    return (this.form = this.fb.group({
      memberId: [0],
      paymentId: ['', [Validators.required]],
      paymentDate: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      hasNewPayment: ['', [Validators.required]],

    }));
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  private checkFormStatus() {
    this.paymentId$ = this.route.queryParamMap.pipe(
      map((params: ParamMap) => {

        const id = Number(params.get('id'));
        this.form.patchValue({ memberId: id })
        const paymentType = params.get('paymentType');
        return { id, paymentType }

      })
    );
    this.paymentId$.pipe(takeUntilDestroyed(this.unsubscribe$))
      .subscribe((_res: any) => {
        console.log('fomn res', _res);

        this.edit();
      });
  }

  // nepali date picker
  updateNepaliDate($event: string) {
    console.log('updaet nepali', $event);
    this.form.patchValue({ paymentDate: $event });
  }
  updateEnglishDate($event: string) {
    console.log('updaet eng', $event);
  }
  onDateChange($event: string) {
    console.log('date', $event);
  }

  // save member
  onSave(): void {
    // this.hasError = false;
    console.log('saving form values', this.form.value);

    this.memberService
      .savePayment(this.form.value)
      .subscribe((user: any) => {
        console.log('member', user);

        this.messageService.createMessage(
          'success',
          user.message
        );
        this.form.reset();

        this.date = new Date();
        this.paymentList$ = of(user);
        this.cd.detectChanges()
      });
  }

  edit() {
    this.paymentList$ = this.paymentId$.pipe(
      switchMap((query: number) => this.memberService.getPaymentFormValues(query))
    );
    this.paymentList$.pipe(takeUntilDestroyed(this.unsubscribe$))
      .subscribe((_res: any) => {

        this.form.patchValue(_res.form);


        const BSDate = this._nepaliDatepickerService.BSToAD(
          _res.form.dob,
          'yyyy/mm/dd'
        );
        this.date = new Date(BSDate);
        // this.cd.detectChanges();
      });
  }

  onCancel(): void {
    console.log('cancel');
    this.router.navigate(['/home']);
  }
}
