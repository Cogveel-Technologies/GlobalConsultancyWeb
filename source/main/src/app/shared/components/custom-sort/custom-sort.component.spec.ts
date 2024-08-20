import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomSortComponent } from './custom-sort.component';

describe('CustomSortComponent', () => {
  let component: CustomSortComponent;
  let fixture: ComponentFixture<CustomSortComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomSortComponent]
    });
    fixture = TestBed.createComponent(CustomSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
