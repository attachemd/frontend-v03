import { Component, Input, OnInit } from '@angular/core';
import { DndFieldService } from 'src/app/services/dnd-field/dnd-field.service';

@Component({
  selector: 'app-dnd-field-edit',
  templateUrl: './dnd-field-edit.component.html',
  styleUrls: ['./dnd-field-edit.component.scss'],
})
export class DndFieldEditComponent implements OnInit {
  @Input()
  public visibility = 'none';

  @Input()
  public field: any = {};

  public isFieldOnEditMode = true;

  constructor(private _dndFieldService: DndFieldService) {}

  ngOnInit(): void {
    console.log('DndFieldEditComponent');
    this._dndFieldService.getFieldEditMode$().subscribe({
      next: (isFieldOnEditMode: boolean) => {
        this.isFieldOnEditMode = isFieldOnEditMode;
      },
      error: (err: any) => {},
    });
  }

  public edit() {
    // alert('Hi!');
    this.field.isOngoing = true;
    this._dndFieldService.setStopDrag$(true);
    this._dndFieldService.setFieldEditMode$(false);
    // this._dndFieldService.setIsOnGoing$(true);
    // console.log('this.field');
    // console.log(this.field);
  }

  public delete() {
    this._dndFieldService.setDeleteField$(this.field.id);
  }
}
