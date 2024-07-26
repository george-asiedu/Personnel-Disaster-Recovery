import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditManagerModalComponent } from './edit-manager-modal.component';

describe('EditManagerModalComponent', () => {
  let component: EditManagerModalComponent;
  let fixture: ComponentFixture<EditManagerModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditManagerModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditManagerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
