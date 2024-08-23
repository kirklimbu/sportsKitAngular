import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalMembersComponent } from './total-members.component';

describe('TotalMembersComponent', () => {
  let component: TotalMembersComponent;
  let fixture: ComponentFixture<TotalMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotalMembersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
