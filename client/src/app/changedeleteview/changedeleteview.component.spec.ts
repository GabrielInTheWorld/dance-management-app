import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangedeleteviewComponent } from './changedeleteview.component';

describe('ChangedeleteviewComponent', () => {
  let component: ChangedeleteviewComponent;
  let fixture: ComponentFixture<ChangedeleteviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangedeleteviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangedeleteviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
