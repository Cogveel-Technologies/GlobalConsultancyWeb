import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterwizardComponent } from './registerwizard.component';

describe('RegisterwizardComponent', () => {
  let component: RegisterwizardComponent;
  let fixture: ComponentFixture<RegisterwizardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterwizardComponent]
    });
    fixture = TestBed.createComponent(RegisterwizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
