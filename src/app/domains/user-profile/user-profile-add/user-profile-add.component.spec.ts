import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileAddComponent } from './user-profile-add.component';

describe('UserProfileAddComponent', () => {
  let component: UserProfileAddComponent;
  let fixture: ComponentFixture<UserProfileAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UserProfileAddComponent]
    });
    fixture = TestBed.createComponent(UserProfileAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
