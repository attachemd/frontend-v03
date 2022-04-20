import { Component, HostBinding, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ValidationErrors,
} from '@angular/forms';
import { DndFieldService } from 'src/app/services/dnd-field/dnd-field.service';
import { FieldConfig } from 'src/app/services/dnd-field/field.model';

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss'],
})
export class RadioButtonComponent implements OnInit {
  // @HostBinding('class')
  // public readonly classList = 'dnd-host';

  // @HostBinding('class.ongoing')
  // public isOngoing: boolean = false;

  public field!: any;
  public group!: FormGroup;
  public data!: any;
  public visibility = 'none';

  public validations = [
    {
      name: 'required',
      message: 'Option name required',
    },
    {
      name: 'pattern',
      pattern: '^[a-zA-Z]+$',
      message: 'Accept only text',
    },
    {
      name: 'duplicated',
      // validator: this._isduplicate,
      message: 'The option name must be unique',
    },
    // {
    //   name: 'custom',
    //   validator: this._isduplicate,
    //   message: 'Invalid option name',
    // },
  ];

  public options: any;

  constructor(
    private _dndFieldService: DndFieldService,
    private _fb: FormBuilder
  ) {}

  @HostBinding('class.ongoing') public get isOngoing() {
    return this.field.isOngoing;
  }

  ngOnInit(): void {
    console.log('RadioButtonComponent');
    const valueArr = this.group.get(
      this.generatedFieldName(this.field, '_editor')
    );

    console.log('valueArr');
    console.log(valueArr);

    this.group.valueChanges.subscribe({
      next: (form) => {
        // keep data model updated
        let generatedFieldName = this.generatedFieldName(this.field, '_editor');

        console.log(
          '%c form values ',
          'background-color: #2B916A; color: #B8DACD; padding: 0 200px; border: 0px solid #47C0BE'
        );
        console.log(form[generatedFieldName]?.options);
        if (form[generatedFieldName]?.options)
          this.data.options = [...form[generatedFieldName]?.options];
        // this.data.options = form[generatedFieldName]?.options;
      },
    });
    // this.isOngoing = this.field.isOngoing;
    // console.log('this.field');
    // console.log(this.field);
    this.options = (
      this.group.get(
        this.generatedFieldName(this.field, '_editor')
      ) as FormGroup
    )?.controls['options'] as FormArray;
  }

  public generatedFieldName(field: FieldConfig, prefix?: any) {
    return this._dndFieldService.generatedFieldName(field, prefix);
  }

  public addOption() {
    this.data.options.push({
      name: '',
    });
    console.log('data');
    console.log(this.data);
    this._dndFieldService.setUpdateControls$();
  }

  public deleteOption(index: number) {
    console.log('index');
    console.log(index);
    this.data.options.splice(index, 1);
    this._dndFieldService.setUpdateControls$();
  }

  public log(val: any) {
    // console.log('from RadioButtonComponent');

    console.log(val);
  }

  public getFormValidationErrors(formGroup: any) {
    Object.keys(formGroup.controls).forEach((key) => {
      const controlErrors: ValidationErrors = formGroup.get(key).errors;

      console.log('nothing!');

      if (controlErrors != null)
        Object.keys(controlErrors).forEach((keyError) => {
          console.log(
            'Key control: ' + key + ', keyError: ' + keyError + ', err value: ',
            controlErrors[keyError]
          );
        });
    });
  }
}
