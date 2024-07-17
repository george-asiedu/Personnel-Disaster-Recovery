import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergencyInitiativeComponent } from './emergency-initiative.component';

describe('EmergencyInitiativeComponent', () => {
  let component: EmergencyInitiativeComponent;
  let fixture: ComponentFixture<EmergencyInitiativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmergencyInitiativeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmergencyInitiativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
