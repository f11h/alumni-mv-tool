import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCardLinkComponent } from './add-card-link.component';

describe('AddCardLinkComponent', () => {
  let component: AddCardLinkComponent;
  let fixture: ComponentFixture<AddCardLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCardLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCardLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
