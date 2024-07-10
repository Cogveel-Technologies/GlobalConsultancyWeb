import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoGinComponent } from './lo-gin.component';

describe('LoGinComponent', () => {
  let component: LoGinComponent;
  let fixture: ComponentFixture<LoGinComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoGinComponent]
    });
    fixture = TestBed.createComponent(LoGinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
