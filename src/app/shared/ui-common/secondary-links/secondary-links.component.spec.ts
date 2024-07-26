import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondaryLinksComponent } from './secondary-links.component';

describe('SecondaryLinksComponent', () => {
  let component: SecondaryLinksComponent;
  let fixture: ComponentFixture<SecondaryLinksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SecondaryLinksComponent]
    });
    fixture = TestBed.createComponent(SecondaryLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
