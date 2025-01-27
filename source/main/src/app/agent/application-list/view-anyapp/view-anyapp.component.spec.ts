import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAnyappComponent } from './view-anyapp.component';

describe('ViewAnyappComponent', () => {
  let component: ViewAnyappComponent;
  let fixture: ComponentFixture<ViewAnyappComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewAnyappComponent]
    });
    fixture = TestBed.createComponent(ViewAnyappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
