import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEmergencyModalComponent } from './create-emergency-modal.component';

describe('CreateEmergencyComponent', () => {
  let component: CreateEmergencyModalComponent;
  let fixture: ComponentFixture<CreateEmergencyModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEmergencyModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEmergencyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
