import { Validators } from '@angular/forms';
import { FieldConfig } from './field.model';

export const essentialFields: FieldConfig[] = [
  {
    type: 'input',
    label: 'Text',
    inputType: 'text',
    name: 'text',
    value: '',
    description: 'Single line of text',
    validations: [
      {
        name: 'required',
        validator: Validators.required,
        message: 'Text Required',
      },
    ],
  },
  {
    type: 'input',
    label: 'Email Address',
    inputType: 'email',
    name: 'email',
    value: '',
    description: 'Email validation input',
    validations: [
      {
        name: 'required',
        validator: Validators.required,
        message: 'Email Required',
      },
      {
        name: 'pattern',
        validator: Validators.pattern(
          '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'
        ),
        message: 'Invalid email',
      },
    ],
  },
  {
    type: 'input',
    label: 'Password',
    inputType: 'password',
    name: 'password',
    value: '',
    description: 'Masked characters input',
    validations: [
      {
        name: 'required',
        validator: Validators.required,
        message: 'Password Required',
      },
    ],
  },
  {
    type: 'radiobutton',
    label: 'Single Selection',
    name: 'single_selection',
    options: ['Option 01', 'Option 02'],
    value: 'Option 01',
    description: 'Select only one item with a radio button',
    validations: [],
  },
  {
    type: 'checkbox',
    label: 'Multiple Selection',
    name: 'multiple_selection',
    value: [],
    options: [],
    description: 'Select one or many options using a checkbox',
    validations: [],
  },
  {
    type: 'select',
    label: 'Select from List',
    name: 'select_from_list',
    value: '',
    options: [],
    description: 'Select option from list',
    validations: [],
  },
  {
    type: 'date',
    label: 'Date',
    name: 'date',
    value: '',
    description: 'Select a date from a datepicker',
    validations: [
      {
        name: 'required',
        validator: Validators.required,
        message: 'Date is Required',
      },
    ],
  },
];
