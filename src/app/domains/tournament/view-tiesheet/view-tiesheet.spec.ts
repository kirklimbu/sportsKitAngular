import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTiesheet } from './view-tiesheet';

describe('ViewTiesheet', () => {
  let component: ViewTiesheet;
  let fixture: ComponentFixture<ViewTiesheet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewTiesheet]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewTiesheet);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
