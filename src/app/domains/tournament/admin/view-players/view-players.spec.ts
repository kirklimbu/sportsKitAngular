import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPlayers } from './view-players';

describe('ViewPlayers', () => {
  let component: ViewPlayers;
  let fixture: ComponentFixture<ViewPlayers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewPlayers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPlayers);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
