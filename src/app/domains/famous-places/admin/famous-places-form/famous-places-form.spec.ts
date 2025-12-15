import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamousPlacesForm } from './famous-places-form';

describe('FamousPlacesForm', () => {
  let component: FamousPlacesForm;
  let fixture: ComponentFixture<FamousPlacesForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FamousPlacesForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FamousPlacesForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
