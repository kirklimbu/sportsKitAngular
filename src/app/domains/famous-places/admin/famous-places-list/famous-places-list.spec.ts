import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamousPlacesList } from './famous-places-list';

describe('FamousPlacesList', () => {
  let component: FamousPlacesList;
  let fixture: ComponentFixture<FamousPlacesList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FamousPlacesList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FamousPlacesList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
