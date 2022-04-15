FormBuilder group global validations
``` typescript
let optionFormGroup = this._fb.group(
  {},
  {
    validators: Validators.compose([this._isduplicate]),
  }
);
```