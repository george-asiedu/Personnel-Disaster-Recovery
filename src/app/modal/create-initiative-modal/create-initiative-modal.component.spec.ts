import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInitiativeModalComponent } from './create-initiative-modal.component';

describe('CreateInitiativeComponent', () => {
  let component: CreateInitiativeModalComponent;
  let fixture: ComponentFixture<CreateInitiativeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateInitiativeModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateInitiativeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
