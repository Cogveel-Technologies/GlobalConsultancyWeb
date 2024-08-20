import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstituteAllDetailsComponent } from './institute-all-details.component';

describe('InstituteAllDetailsComponent', () => {
  let component: InstituteAllDetailsComponent;
  let fixture: ComponentFixture<InstituteAllDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstituteAllDetailsComponent]
    });
    fixture = TestBed.createComponent(InstituteAllDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
