import { Validators } from '@angular/forms';
import { FieldConfig } from './field.model';

export const suggestedFields: FieldConfig[] = [
  {
    type: 'input',
    label: 'Zip Code',
    inputType: 'text',
    name: 'zip_code',
    value: 'john',
    description: 'Field description',
    validations: [
      {
        name: 'required',
        message: 'Name Required',
      },
    ],
  },
  {
    type: 'input',
    label: 'Address',
    inputType: 'text',
    name: 'address',
    value: 'john',
    description: 'Field description',
    validations: [
      {
        name: 'required',
        message: 'Name Required',
      },
    ],
  },
  {
    type: 'input',
    label: 'Full Name',
    inputType: 'text',
    name: 'full_name',
    value: 'john',
    description: 'Field description',
    validations: [
      {
        name: 'required',
        message: 'Name Required',
      },
    ],
  },
  {
    type: 'input',
    label: 'Username',
    inputType: 'text',
    name: 'name',
    value: 'john',
    description: 'Field description',
    validations: [
      {
        name: 'required',
        message: 'Name Required',
      },
      {
        name: 'pattern',
        pattern: '^[a-zA-Z]+$',
        message: 'Accept only text',
      },
    ],
  },
  {
    type: 'input',
    label: 'Email Address',
    inputType: 'email',
    name: 'email',
    value: 'john@gmail.com',
    description: 'Field description',
    validations: [
      {
        name: 'required',
        message: 'Email Required',
      },
      {
        name: 'pattern',
        pattern: '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$',
        message: 'Invalid email',
      },
    ],
  },
  {
    type: 'input',
    label: 'Password',
    inputType: 'password',
    name: 'password',
    value: 'pass1234',
    description: 'Field description',
    validations: [
      {
        name: 'required',
        message: 'Password Required',
      },
    ],
  },
  {
    type: 'radiobutton',
    label: 'Gender',
    name: 'gender',
    options: ['Male', 'Female'],
    value: 'Male',
    validations: [],
  },
  {
    type: 'date',
    label: 'Date of Birth',
    name: 'date_of_birth',
    value: '4/14/2021',
    description: 'Field description',
    validations: [
      {
        name: 'required',
        message: 'Date of Birth Required',
      },
    ],
  },
  {
    type: 'select',
    label: 'Country',
    name: 'country',
    value: 'Morocco',
    description: 'Field description',
    options: ['UAE', 'Morocco', 'UK', 'US'],
    validations: [],
  },
  {
    type: 'checkbox',
    label: 'Accept Terms',
    name: 'term',
    value: true,
    description: 'Field description',
    validations: [],
  },
];
