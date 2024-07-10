import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterInstituteComponent } from './register-institute.component';

describe('RegisterInstituteComponent', () => {
  let component: RegisterInstituteComponent;
  let fixture: ComponentFixture<RegisterInstituteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterInstituteComponent]
    });
    fixture = TestBed.createComponent(RegisterInstituteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
