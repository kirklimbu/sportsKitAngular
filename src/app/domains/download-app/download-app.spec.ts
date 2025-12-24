import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadApp } from './download-app';

describe('DownloadApp', () => {
  let component: DownloadApp;
  let fixture: ComponentFixture<DownloadApp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DownloadApp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloadApp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
