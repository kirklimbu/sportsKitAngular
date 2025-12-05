import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageHeaderSection } from '../../page-header-section';

describe('PageHeaderSection', () => {
  let component: PageHeaderSection;
  let fixture: ComponentFixture<PageHeaderSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageHeaderSection],
    }).compileComponents();

    fixture = TestBed.createComponent(PageHeaderSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
