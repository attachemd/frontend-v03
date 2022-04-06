import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmFieldDeleteComponent } from './confirm-field-delete.component';

describe('ConfirmFieldDeleteComponent', () => {
  let component: ConfirmFieldDeleteComponent;
  let fixture: ComponentFixture<ConfirmFieldDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmFieldDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmFieldDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
