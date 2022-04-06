import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DndFieldEditComponent } from './dnd-field-edit.component';

describe('DndFieldEditComponent', () => {
  let component: DndFieldEditComponent;
  let fixture: ComponentFixture<DndFieldEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DndFieldEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DndFieldEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
