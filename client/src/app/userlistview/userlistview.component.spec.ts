import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserlistviewComponent } from './userlistview.component';

describe('UserlistviewComponent', () => {
  let component: UserlistviewComponent;
  let fixture: ComponentFixture<UserlistviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserlistviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserlistviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
