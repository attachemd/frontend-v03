FormBuilder group global validations
``` typescript
let optionFormGroup = this._fb.group(
  {},
  {
    validators: Validators.compose([this._isduplicate]),
  }
);
```
radio button
```html
  <div
    class="ft-lm-edit-field"
    [formGroup]="group"
    (mouseenter)="visibility = 'inline-block'"
    (mouseleave)="visibility = 'none'"
  >
    <!-- <label class="radio-label">{{ field.label }}:</label> -->
    <div>
      <mat-label class="ft-lm-label">{{ field.label }}</mat-label>
    </div>
    <div class="ft-lm-field" *ngIf="false">
      <!-- <mat-radio-group [formControlName]="field.label.split(' ').join('_').toLowerCase().trim()"> -->
      <mat-radio-group [formControlName]="field.name">
        <!-- <mat-radio-button *ngFor="let item of field.options" [value]="item">
          {{ item }}
        </mat-radio-button> -->
        <mat-radio-button
          *ngFor="let optionElement of options"
          [value]="optionElement.name"
        >
          {{ optionElement.name }}
        </mat-radio-button>
      </mat-radio-group>
    </div>
    <app-dnd-field-edit
      [visibility]="visibility"
      [field]="field"
    ></app-dnd-field-edit>
  </div>
```
radio button
```html
  <div
    class="ft-lm-edit-field"
    [formGroup]="group"
    (mouseenter)="visibility = 'inline-block'"
    (mouseleave)="visibility = 'none'"
  >
    <!-- <label class="radio-label">{{ field.label }}:</label> -->
    <div>
      <mat-label class="ft-lm-label">{{ field.label }}</mat-label>
    </div>
    <div class="ft-lm-field" formGroupName="single_selection">
      <!-- <mat-radio-group [formControlName]="field.label.split(' ').join('_').toLowerCase().trim()"> -->
      <mat-radio-group formArrayName="options">
        <!-- <mat-radio-button *ngFor="let item of field.options" [value]="item">
          {{ item }}
        </mat-radio-button> -->
        <div class="option-field" *ngFor="let option of singles; let i = index">
          <div [formGroupName]="i">
            <!-- [value]="option.name" -->
            <div >
              <mat-radio-button  [value]="option.name">
                {{ option.name }}
              </mat-radio-button>
            </div>

          </div>
        </div>
      </mat-radio-group>
    </div>
    <app-dnd-field-edit
      [visibility]="visibility"
      [field]="field"
    ></app-dnd-field-edit>
  </div>
```
radio button
```html
  <div
    class="ft-lm-edit-field"
    [formGroup]="group"
    (mouseenter)="visibility = 'inline-block'"
    (mouseleave)="visibility = 'none'"
  >
    <!-- <label class="radio-label">{{ field.label }}:</label> -->
    <div>
      <mat-label class="ft-lm-label">{{ field.label }}</mat-label>
    </div>
    <div class="ft-lm-field" formGroupName="single_selection">
      <!-- <mat-radio-group [formControlName]="field.label.split(' ').join('_').toLowerCase().trim()"> -->
      <div formArrayName="options">
        <!-- <mat-radio-button *ngFor="let item of field.options" [value]="item">
          {{ item }}
        </mat-radio-button> -->
        <div class="option-field" *ngFor="let option of singles; let i = index">
          <div [formGroupName]="i">
            <!-- [value]="option.name" -->
            <div>
              <mat-radio-group formControlName="name">
                <mat-radio-button
                  [value]="option.value.name"
                  [checked]="option.controls.name.value === option.value.name"
                >
                  {{ option.value.name }}
                </mat-radio-button>
                <!-- <mat-radio-button  value="value">
                value
              </mat-radio-button> -->
              </mat-radio-group>
            </div>
          </div>
        </div>
      </div>
    </div>
    <app-dnd-field-edit
      [visibility]="visibility"
      [field]="field"
    ></app-dnd-field-edit>
  </div>
```
``` html
<form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
  <table>
    <tr>
      <td></td>
    </tr>
    <tr>
      <td>First Name :</td>
      <td>
        <input
          type="text"
          formControlName="firstName"
          class="form-control"
          [ngClass]="{ 'is-invalid': submitted && f.firstName.errors }"
        />
        <div *ngIf="submitted && f.firstName.errors" class="invalid-feedback">
          <div *ngIf="f.firstName.errors.required">First Name is required</div>
        </div>
        <div
          *ngIf="
            registerForm.get('firstName').errors &&
            registerForm.get('firstName').dirty &&
            registerForm.get('firstName').errors.validFname
          "
        >
          First name should start with @
        </div>
      </td>
    </tr>
    <tr>
      <td>Last Name :</td>
      <td>
        <input
          type="text"
          formControlName="lastName"
          class="form-control"
          [ngClass]="{ 'is-invalid': submitted && f.lastName.errors }"
        />
        <div *ngIf="submitted && f.lastName.errors" class="invalid-feedback">
          <div *ngIf="f.lastName.errors.required">Last Name is required</div>
        </div>
        <div
          *ngIf="
            registerForm.get('lastName').errors &&
            registerForm.get('lastName').dirty &&
            registerForm.get('lastName').errors.validLname
          "
        >
          Last name should be > 3
        </div>
      </td>
    </tr>
    <tr>
      <td>Email :</td>
      <td>
        <input
          type="text"
          formControlName="email"
          class="form-control"
          [ngClass]="{ 'is-invalid': submitted && f.email.errors }"
        />
        <div *ngIf="submitted && f.email.errors" class="invalid-feedback">
          <div *ngIf="f.email.errors.required">Email is required</div>
          <div *ngIf="f.email.errors.email">
            Email must be a valid email address
          </div>
        </div>
      </td>
    </tr>
    <tr>
      <td>Password :</td>
      <td>
        <input
          type="password"
          formControlName="password"
          class="form-control"
          [ngClass]="{ 'is-invalid': submitted && f.password.errors }"
        />
        <div *ngIf="submitted && f.password.errors" class="invalid-feedback">
          <div *ngIf="f.password.errors.required">Password is required</div>
          <div *ngIf="f.password.errors.minlength">
            Password must be > 6 character long
          </div>
        </div>
      </td>
    </tr>
    <tr>
      <td>Confirm Password :</td>
      <td>
        <input
          type="password"
          formControlName="confirmPassword"
          class="form-control"
          [ngClass]="{ 'is-invalid': submitted && f.confirmPassword.errors }"
        />
        <div
          *ngIf="submitted && f.confirmPassword.errors"
          class="invalid-feedback"
        >
          <div *ngIf="f.confirmPassword.errors.required">
            Confirm Password is required
          </div>
          <div *ngIf="f.confirmPassword.errors.mustMatch">
            Password should be same as Confirm password
          </div>
        </div>
      </td>
    </tr>
    <tr>
      <td>
        <button class="btn btn-primary">Register</button>
      </td>
    </tr>
  </table>
</form>
```