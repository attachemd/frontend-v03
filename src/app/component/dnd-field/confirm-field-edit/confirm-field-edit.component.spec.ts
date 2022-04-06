import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmFieldEditComponent } from './confirm-field-edit.component';

describe('ConfirmFieldEditComponent', () => {
  let component: ConfirmFieldEditComponent;
  let fixture: ComponentFixture<ConfirmFieldEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmFieldEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmFieldEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
