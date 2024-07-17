import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProfessionModalComponent } from './create-profession-modal.component';

describe('CreateProfessionComponent', () => {
  let component: CreateProfessionModalComponent;
  let fixture: ComponentFixture<CreateProfessionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateProfessionModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateProfessionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
