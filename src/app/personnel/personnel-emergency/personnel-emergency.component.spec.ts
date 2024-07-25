import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnelEmergencyComponent } from './personnel-emergency.component';

describe('PersonnelEmergencyComponent', () => {
  let component: PersonnelEmergencyComponent;
  let fixture: ComponentFixture<PersonnelEmergencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonnelEmergencyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonnelEmergencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
