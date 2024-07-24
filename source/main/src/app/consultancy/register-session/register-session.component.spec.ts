import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterSessionComponent } from './register-session.component';

describe('RegisterSessionComponent', () => {
  let component: RegisterSessionComponent;
  let fixture: ComponentFixture<RegisterSessionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterSessionComponent]
    });
    fixture = TestBed.createComponent(RegisterSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
