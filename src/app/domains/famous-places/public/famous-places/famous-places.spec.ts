import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamousPlaces } from './famous-places';

describe('FamousPlaces', () => {
  let component: FamousPlaces;
  let fixture: ComponentFixture<FamousPlaces>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FamousPlaces]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FamousPlaces);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
