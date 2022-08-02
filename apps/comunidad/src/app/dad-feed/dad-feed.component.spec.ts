import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadFeedComponent } from './dad-feed.component';

describe('DadFeedComponent', () => {
  let component: DadFeedComponent;
  let fixture: ComponentFixture<DadFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DadFeedComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DadFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
