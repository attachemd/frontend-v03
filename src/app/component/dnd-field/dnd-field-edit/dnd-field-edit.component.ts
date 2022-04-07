import { Component, Input, OnInit } from '@angular/core';
import { DndFieldService } from 'src/app/services/dnd-field/dnd-field.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmFieldDeleteComponent } from '../confirm-field-delete/confirm-field-delete.component';

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

  public isFieldOnEditMode = false;
  public isOnDndMode = true;
  // public visibility = 'none';

  constructor(
    private _dndFieldService: DndFieldService,
    private _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this._dndFieldService.getDndMode$().subscribe({
      next: (isOnDndMode) => {
        this.isOnDndMode = isOnDndMode;
      },
      error: (err: any) => {
        console.log('error');
        console.log(err);
      },
    });

    this._dndFieldService.getFieldEditMode$().subscribe({
      next: (isFieldOnEditMode: boolean) => {
        this.isFieldOnEditMode = isFieldOnEditMode;
      },
      error: (err: any) => {
        console.log('error');
        console.log(err);
      },
    });
  }

  public edit() {
    // alert('Hi!');
    this.field.isOngoing = true;
    this._dndFieldService.setStopDrag$(true);
    this._dndFieldService.setFieldEditMode$(true);
    // this._dndFieldService.setIsOnGoing$(true);
    // console.log('this.field');
    // console.log(this.field);
  }

  public delete() {
    this._dialog
      .open(ConfirmFieldDeleteComponent)
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (result) this._dndFieldService.setDeleteField$(this.field.id);
        },
        error: (error: any) => {
          console.log('error');
          console.log(error);
        },
      });
  }
}
