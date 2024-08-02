import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GallariesComponent } from './gallaries.component';

describe('GallariesComponent', () => {
  let component: GallariesComponent;
  let fixture: ComponentFixture<GallariesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GallariesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GallariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
