import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppUpdateCheckComponent } from './app-update-check.component';

describe('AppUpdateCheckComponent', () => {
  let component: AppUpdateCheckComponent;
  let fixture: ComponentFixture<AppUpdateCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppUpdateCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppUpdateCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
