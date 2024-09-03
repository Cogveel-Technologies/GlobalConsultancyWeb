import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterConsultancyComponent } from './register-consultancy.component';

describe('RegisterConsultancyComponent', () => {
  let component: RegisterConsultancyComponent;
  let fixture: ComponentFixture<RegisterConsultancyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterConsultancyComponent]
    });
    fixture = TestBed.createComponent(RegisterConsultancyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
