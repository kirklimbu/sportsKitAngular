import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InquiryComponent } from './inquiry.component';

describe('InquiryComponent', () => {
  let component: InquiryComponent;
  let fixture: ComponentFixture<InquiryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InquiryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
