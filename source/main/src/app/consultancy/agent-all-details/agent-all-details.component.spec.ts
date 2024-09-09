import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentAllDetailsComponent } from './agent-all-details.component';

describe('AgentAllDetailsComponent', () => {
  let component: AgentAllDetailsComponent;
  let fixture: ComponentFixture<AgentAllDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgentAllDetailsComponent]
    });
    fixture = TestBed.createComponent(AgentAllDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
