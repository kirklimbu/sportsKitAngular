import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddTraineeComponent } from './add-trainee.component';

describe('AddTraineeComponent', () => {
  let component: AddTraineeComponent;
  let fixture: ComponentFixture<AddTraineeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTraineeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddTraineeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
