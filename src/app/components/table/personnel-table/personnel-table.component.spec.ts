import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnelTableComponent } from './personnel-table.component';

describe('PersonnelTableComponent', () => {
  let component: PersonnelTableComponent;
  let fixture: ComponentFixture<PersonnelTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonnelTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonnelTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
