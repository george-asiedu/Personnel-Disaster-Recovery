import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergencyInitiativeTableComponent } from './emergency-initiative-table.component';

describe('EmergencyInitiativeTableComponent', () => {
  let component: EmergencyInitiativeTableComponent;
  let fixture: ComponentFixture<EmergencyInitiativeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmergencyInitiativeTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmergencyInitiativeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
