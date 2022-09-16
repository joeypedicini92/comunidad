import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeDrawComponent } from './free-draw.component';

describe('FreeDrawComponent', () => {
  let component: FreeDrawComponent;
  let fixture: ComponentFixture<FreeDrawComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FreeDrawComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FreeDrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
