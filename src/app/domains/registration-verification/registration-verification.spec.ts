import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationVerification } from './registration-verification';

describe('RegistrationVerification', () => {
  let component: RegistrationVerification;
  let fixture: ComponentFixture<RegistrationVerification>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrationVerification]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrationVerification);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
