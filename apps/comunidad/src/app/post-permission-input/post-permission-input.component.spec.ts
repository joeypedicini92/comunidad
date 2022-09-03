import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostPermissionInputComponent } from './post-permission-input.component';

describe('PostPermissionInputComponent', () => {
  let component: PostPermissionInputComponent;
  let fixture: ComponentFixture<PostPermissionInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostPermissionInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PostPermissionInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
