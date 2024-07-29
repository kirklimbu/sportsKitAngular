import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NepaliDatepickerComponent } from './Nepali-Datepicker.component';

describe('NepaliDatepickerComponent', () => {
  let component: NepaliDatepickerComponent;
  let fixture: ComponentFixture<NepaliDatepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NepaliDatepickerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NepaliDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
