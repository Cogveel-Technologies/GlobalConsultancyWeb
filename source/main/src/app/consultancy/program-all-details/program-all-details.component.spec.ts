import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramAllDetailsComponent } from './program-all-details.component';

describe('ProgramAllDetailsComponent', () => {
  let component: ProgramAllDetailsComponent;
  let fixture: ComponentFixture<ProgramAllDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProgramAllDetailsComponent]
    });
    fixture = TestBed.createComponent(ProgramAllDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
