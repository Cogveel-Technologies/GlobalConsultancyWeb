import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterIntakesComponent } from './register-intakes.component';

describe('RegisterIntakesComponent', () => {
  let component: RegisterIntakesComponent;
  let fixture: ComponentFixture<RegisterIntakesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterIntakesComponent]
    });
    fixture = TestBed.createComponent(RegisterIntakesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
