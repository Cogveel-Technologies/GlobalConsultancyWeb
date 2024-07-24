import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultancyAllDetailsComponent } from './consultancy-all-details.component';

describe('ConsultancyAllDetailsComponent', () => {
  let component: ConsultancyAllDetailsComponent;
  let fixture: ComponentFixture<ConsultancyAllDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultancyAllDetailsComponent]
    });
    fixture = TestBed.createComponent(ConsultancyAllDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
