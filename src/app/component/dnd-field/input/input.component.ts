// https://stackoverflow.com/questions/34641281/how-to-add-class-to-host-element
import { Component, HostBinding } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DndFieldService } from 'src/app/services/dnd-field/dnd-field.service';
import { FieldConfig } from 'src/app/services/dnd-field/field.model';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  // @HostBinding('class')
  // public readonly classList = 'dnd-host';

  public field: any = {};
  public group!: FormGroup;
  public visibility = 'none';

  // public isOngoing: boolean = false;

  constructor(private _dndFieldService: DndFieldService) {}
  @HostBinding('class.ongoing') public get isOngoing() {
    return this.field.isOngoing;
  }

  public generatedFieldName(field: FieldConfig, prefix?: any) {
    return this._dndFieldService.generatedFieldName(field, prefix);
  }
}
