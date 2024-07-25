import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionTableComponent } from './profession-table.component';

describe('ProfessionTableComponent', () => {
  let component: ProfessionTableComponent;
  let fixture: ComponentFixture<ProfessionTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfessionTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
