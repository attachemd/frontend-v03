// https://stackoverflow.com/questions/34641281/how-to-add-class-to-host-element
import { Component, HostBinding, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DndFieldService } from 'src/app/services/dnd-field/dnd-field.service';
import { FieldConfig } from 'src/app/services/dnd-field/field.model';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  // @HostBinding('class')
  // public readonly classList = 'dnd-host';

  public field: any = {};
  public group!: FormGroup;
  public visibility = 'none';
  public index!: number;

  // public isOngoing: boolean = false;

  constructor(private _dndFieldService: DndFieldService) {}

  @HostBinding('class.ongoing') public get isOngoing() {
    return this.field.isOngoing;
  }

  ngOnInit(): void {
    console.log(
      '%c index ',
      'background: red; color: #fff; padding: 10px 20px; border: 0px solid #47C0BE; width: 100%; font-weight: bold; font-size: 13px;'
    );
    console.log(this.index);
  }

  public log(val: any) {
    // console.log('from RadioButtonComponent');

    console.log(val);
  }

  public generatedFieldName(field: FieldConfig, prefix?: any) {
    return this._dndFieldService.generatedFieldName(field, prefix);
  }
}
