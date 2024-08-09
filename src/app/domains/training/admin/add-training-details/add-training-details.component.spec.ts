import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTrainingDetailsComponent } from './add-training-details.component';

describe('AddTrainingDetailsComponent', () => {
  let component: AddTrainingDetailsComponent;
  let fixture: ComponentFixture<AddTrainingDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTrainingDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTrainingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
