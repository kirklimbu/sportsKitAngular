import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSubmitButtonsComponent } from './form-submit-buttons.component';

describe('FormSubmitButtonsComponent', () => {
  let component: FormSubmitButtonsComponent;
  let fixture: ComponentFixture<FormSubmitButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormSubmitButtonsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSubmitButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
