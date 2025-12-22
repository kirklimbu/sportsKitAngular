import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupMessage } from './popup-message';

describe('PopupMessage', () => {
  let component: PopupMessage;
  let fixture: ComponentFixture<PopupMessage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupMessage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupMessage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
