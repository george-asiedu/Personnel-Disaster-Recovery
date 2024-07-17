import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEmergencyModalComponent } from './edit-emergency-modal.component';

describe('EditEmergencyModalComponent', () => {
  let component: EditEmergencyModalComponent;
  let fixture: ComponentFixture<EditEmergencyModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditEmergencyModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditEmergencyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
