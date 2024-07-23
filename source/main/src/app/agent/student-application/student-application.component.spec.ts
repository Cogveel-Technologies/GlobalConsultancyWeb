import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentApplicationComponent } from './student-application.component';

describe('StudentApplicationComponent', () => {
  let component: StudentApplicationComponent;
  let fixture: ComponentFixture<StudentApplicationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentApplicationComponent]
    });
    fixture = TestBed.createComponent(StudentApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
