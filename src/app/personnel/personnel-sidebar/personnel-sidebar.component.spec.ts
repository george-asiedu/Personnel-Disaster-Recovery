import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnelSidebarComponent } from './personnel-sidebar.component';

describe('PersonnelSidebarComponent', () => {
  let component: PersonnelSidebarComponent;
  let fixture: ComponentFixture<PersonnelSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonnelSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonnelSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
