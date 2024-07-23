import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDocumentComponent } from './student-document.component';

describe('StudentDocumentComponent', () => {
  let component: StudentDocumentComponent;
  let fixture: ComponentFixture<StudentDocumentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentDocumentComponent]
    });
    fixture = TestBed.createComponent(StudentDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
