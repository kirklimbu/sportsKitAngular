import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TotalEventsComponent } from './total-events.component';

describe('TotalEventsComponent', () => {
  let component: TotalEventsComponent;
  let fixture: ComponentFixture<TotalEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotalEventsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TotalEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
