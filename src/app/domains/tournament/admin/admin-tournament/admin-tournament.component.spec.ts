import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTournamentComponent } from './admin-tournament.component';

describe('AdminTournamentComponent', () => {
  let component: AdminTournamentComponent;
  let fixture: ComponentFixture<AdminTournamentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminTournamentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminTournamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
