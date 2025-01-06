import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDropdownValuesComponent } from './add-dropdown-values.component';

describe('AddDropdownValuesComponent', () => {
  let component: AddDropdownValuesComponent;
  let fixture: ComponentFixture<AddDropdownValuesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddDropdownValuesComponent]
    });
    fixture = TestBed.createComponent(AddDropdownValuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
