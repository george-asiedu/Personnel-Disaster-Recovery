import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerModalComponent } from './manager-modal.component';

describe('ManagerModalComponent', () => {
  let component: ManagerModalComponent;
  let fixture: ComponentFixture<ManagerModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
