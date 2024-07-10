import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagentsComponent } from './listagents.component';

describe('ListagentsComponent', () => {
  let component: ListagentsComponent;
  let fixture: ComponentFixture<ListagentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListagentsComponent]
    });
    fixture = TestBed.createComponent(ListagentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
