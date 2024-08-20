import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterProgramComponent } from './register-program.component';

describe('RegisterProgramComponent', () => {
  let component: RegisterProgramComponent;
  let fixture: ComponentFixture<RegisterProgramComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterProgramComponent]
    });
    fixture = TestBed.createComponent(RegisterProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
