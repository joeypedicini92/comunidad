import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PillListComponent } from './pill-list.component';

describe('PillListComponent', () => {
  let component: PillListComponent;
  let fixture: ComponentFixture<PillListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PillListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PillListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
