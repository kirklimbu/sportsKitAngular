import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AllMembersComponent } from './all-members.component';

describe('AllMembersComponent', () => {
  let component: AllMembersComponent;
  let fixture: ComponentFixture<AllMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllMembersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AllMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
