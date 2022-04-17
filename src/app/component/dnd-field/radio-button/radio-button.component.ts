import { Component, HostBinding, OnInit } from '@angular/core';
import { FormArray, FormGroup, ValidationErrors } from '@angular/forms';

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
  public visibility = 'none';
  public options = [
    { name: 'Option 01' },
    { name: 'Option 02' },
    { name: 'Option 03' },
  ];

  public validations = [
    {
      name: 'required',
      message: 'Name Required',
    },
    {
      name: 'pattern',
      pattern: '^[a-zA-Z]+$',
      message: 'Accept only text',
    },
    // {
    //   name: 'custom',
    //   validator: this._isduplicate,
    //   message: 'Invalid option name',
    // },
  ];

  public singles: any;

  constructor() {}
  @HostBinding('class.ongoing') public get isOngoing() {
    return this.field.isOngoing;
  }

  ngOnInit(): void {
    console.log('RadioButtonComponent');
    // this.isOngoing = this.field.isOngoing;
    console.log('this.field');
    console.log(this.field);
    this.singles = (
      (this.group.get('single_selection_editor') as FormGroup)?.controls[
        'options'
      ] as FormArray
    )?.controls;
    // console.log('this.singles');
    // console.log(this.singles);
    // console.log(this.singles?.values);
    // console.log(this.group.get('single_selection')?.value.options);
    // this.singles?.forEach((item: any) => {
    //   console.log('item.controls.name.value');
    //   console.log(item.controls.name.value);
    //   console.log('item.value.name');
    //   console.log(item.value.name);
    // });
  }

  public log(val: any) {
    // console.log('from RadioButtonComponent');

    console.log(val);
  }

  public getFormValidationErrors(formGroup: any) {
    Object.keys(formGroup.controls).forEach((key) => {
      const controlErrors: ValidationErrors = formGroup.get(key).errors;

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
