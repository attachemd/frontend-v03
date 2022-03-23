In this post we are going to see how to dynamically create a reactive form with configurable fields and validations.

Dynamic form can be very useful and more economical to create the forms based on varying business object model and without the need for adding/changing any code.

Install Angular **CLI** latest version if you don’t have the latest version of the CLI.

```
npm install -g @angular/cli@latest
```

Create a new project as **dynamic-form**.

```
ng new dynamic-form
```
It takes a couple of minutes for creating a project. Once the project is created, change the current directory into dynamic-form.
```
cd dynamic-form
```

Install Angular **Material**. Since we are going to use the angular material UI components.

We will use the ``ng add`` command to add Angular Material to the application.

```
ng add @angular/material @angular/cdk
```

Install **@angular/material-moment-adapter** and **moment**. It’s the dependency for Material Datepicker.

```
npm install --save @angular/material-moment-adapter moment
```

Create a custom module as **material**.
```
ng generate module material --flat
```
Import the required material modules by pasting the below code in **/src/app/material.module.ts** file.

``` typescript
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import {
MatButtonModule,
MatIconModule,
MatCardModule,
MatFormFieldModule,
MatInputModule,
MatListModule,
MatDatepickerModule,
MatNativeDateModule,
MatSelectModule,
MatOptionModule,
MatCheckboxModule,
MatRadioModule
} from "@angular/material";
@NgModule({
imports: [
MatButtonModule,
MatIconModule,
MatCardModule,
MatFormFieldModule,
MatInputModule,
MatListModule,
MatDatepickerModule,
MatNativeDateModule,
MatMomentDateModule,
MatSelectModule,
MatOptionModule,
MatCheckboxModule,
MatRadioModule
],
exports: [
MatButtonModule,
MatIconModule,
MatCardModule,
MatFormFieldModule,
MatInputModule,
MatListModule,
MatDatepickerModule,
MatNativeDateModule,
MatMomentDateModule,
MatSelectModule,
MatOptionModule,
MatCheckboxModule,
MatRadioModule
]
})
export class MaterialModule {}
```
Import **MaterialModule**, **FormsModule**, **ReactiveFormsModule** in **/src/app/app.module.ts** file.

``` typescript
...
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
@NgModule({
...,
imports: [
...,
MaterialModule,
ReactiveFormsModule,
FormsModule
],
...
})
export class AppModule { }
```
Let’s create the interfaces for dynamic field configuration. Create a file called **field.interface.ts** inside the **app** directory and paste the below code.
``` typescript
export interface Validator {
name: string;
validator: any;
message: string;
}
export interface FieldConfig {
label?: string;
name?: string;
inputType?: string;
options?: string[];
collections?: any;
type: string;
value?: any;
validations?: Validator[];
}
```

First, we will create the components for each type of fields (**Input**, **Button**, **Select**, **Datepicker**, **Radiobutton**, **Checkbox**) using the material components. All the components accept two inputs **FieldConfig** (name, type, label, value, validations,. .) and **FormGroup**.

Create a directory **components** inside the **app** directory.

```
mkdir src/app/components
```

## Input

Create an input component under **app/components** directory and import it to **app.module.ts**.

```
ng generate component components/input --inline-style=true --inline-template=true --spec=false --module app
```

Paste the below code in **/app/components/input/input.component.ts** file. It accepts two inputs **field** type of **FieldConfig** and **group** type of **FormGroup**. In the template, bind the **formGroup**, **formControlName** and **placeholder** directives and use the ``<mat-error>`` element to display the validation messages if the corresponding field validation conditions are not satisfied.

``` typescript
import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from "../../field.interface";
@Component({
selector: "app-input",
template: `
<mat-form-field class="demo-full-width" [formGroup]="group">

<input matInput [formControlName]="field.name" [placeholder]="field.label" [type]="field.inputType">

<ng-container *ngFor="let validation of field.validations;" ngProjectAs="mat-error">

<mat-error *ngIf="group.get(field.name).hasError(validation.name)">{{validation.message}}</mat-error>

</ng-container>
</mat-form-field>
`,
styles: []
})
export class InputComponent implements OnInit {
field: FieldConfig;
group: FormGroup;
constructor() {}
ngOnInit() {}
}
```

## Button

Create a button component under **app/components** directory and import it to **app.module.ts**.

```
ng generate component components/button --inline-style=true --inline-template=true --spec=false --module app
```
Paste the below code in **/app/components/button/button.component.ts** file.

``` typescript
import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from "../../field.interface";
@Component({
selector: "app-button",
template: `
<div class="demo-full-width margin-top" [formGroup]="group">

<button type="submit" mat-raised-button color="primary">{{field.label}}</button>
</div>
`,
styles: []
})
export class ButtonComponent implements OnInit {
field: FieldConfig;
group: FormGroup;
constructor() {}
ngOnInit() {}
}
```

## Select

Create a select component under **app/components** directory and import it to **app.module.ts**.

```
ng generate component components/select --inline-style=true --inline-template=true --spec=false --module app
```

Paste the below code in **/app/components/select/select.component.ts** file.

``` typescript
import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from "../../field.interface";
@Component({
selector: "app-select",
template: `
<mat-form-field class="demo-full-width margin-top" [formGroup]="group">

<mat-select [placeholder]="field.label" [formControlName]="field.name">
<mat-option *ngFor="let item of field.options" [value]="item">{{item}}</mat-option>
</mat-select>

</mat-form-field>
`,
styles: []
})
export class SelectComponent implements OnInit {
field: FieldConfig;
group: FormGroup;
constructor() {}
ngOnInit() {}
}
```

## Date

Create a date component under **app/components** directory and import it in **app.module.ts** to add material datepicker component functionality.

```
ng generate component components/date --inline-style=true --inline-template=true --spec=false --module app
```

Paste the below code in **/app/components/date/date.component.ts** file.

``` typescript
import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from "../../field.interface";
@Component({
selector: "app-date",
template: `
<mat-form-field class="demo-full-width margin-top" [formGroup]="group">

<input matInput [matDatepicker]="picker" [formControlName]="field.name" [placeholder]="field.label">

<mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>

<mat-datepicker #picker></mat-datepicker>

<mat-hint></mat-hint>

<ng-container *ngFor="let validation of field.validations;" ngProjectAs="mat-error">
<mat-error *ngIf="group.get(field.name).hasError(validation.name)">{{validation.message}}</mat-error>
</ng-container>

</mat-form-field>
`,
styles: []
})
export class DateComponent implements OnInit {
field: FieldConfig;
group: FormGroup;
constructor() {}
ngOnInit() {}
}
```

## Radiobutton
Create a radiobutton component under **app/components** directory and import it to **app.module.ts**.

```
ng generate component components/radiobutton --inline-style=true --inline-template=true --spec=false --module app
```

Paste the below code in **/app/components/radiobutton/radiobutton.component.ts** file.

``` typescript
import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from "../../field.interface";
@Component({
selector: "app-radiobutton",
template: `
<div class="demo-full-width margin-top" [formGroup]="group">

<label class="radio-label-padding">{{field.label}}:</label>

<mat-radio-group [formControlName]="field.name">
<mat-radio-button *ngFor="let item of field.options" [value]="item">{{item}}</mat-radio-button>
</mat-radio-group>

</div>
`,
styles: []
})
export class RadiobuttonComponent implements OnInit {
field: FieldConfig;
group: FormGroup;
constructor() {}
ngOnInit() {}
}
```

## Checkbox

Create a checkbox component under **app/components** directory and import it to **app.module.ts**.

```
ng generate component components/checkbox --inline-style=true --inline-template=true --spec=false --module app
```

Paste the below code in **/app/components/checkbox/checkbox.component.ts** file.

``` typescript
import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from "../../field.interface";
@Component({
selector: "app-checkbox",
template: `
<div class="demo-full-width margin-top" [formGroup]="group" >
<mat-checkbox [formControlName]="field.name">{{field.label}}</mat-checkbox>
</div>
`,
styles: []
})
export class CheckboxComponent implements OnInit {
field: FieldConfig;
group: FormGroup;
constructor() {}
ngOnInit() {}
}
```

All the fields components are ready. Now we will create a dynamicfield directive to dynamically create the **InputComponent**, **ButtonComponent**, **SelectComponent**, **DateComponent** and **RadiobuttonComponent**, **CheckboxComponent**.

Create a directory **dynamic-field** inside the **app/components/** directory.

```
mkdir src/app/components/dynamic-field
```

## DynamicField

Create a directive **dynamic-field** under **app/components/dynamic-field** directory and import it to **app.module.ts**.

```
ng generate directive components/dynamic-field/dynamic-field --spec=false --module app
```

Now we can add all the necessory code in **/app/components/dynamic-field/dynamic-field.directive.ts**

Import **ComponentFactoryResolver**, **ComponentRef**, **ViewContainerRef**, **FormGroup**, **FieldConfig** and all field components.

``` typescript
import {
ComponentFactoryResolver, ComponentRef, Directive, Input, OnInit,
ViewContainerRef
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from "../../field.interface";
import { InputComponent } from "../input/input.component";
import { ButtonComponent } from "../button/button.component";
import { SelectComponent } from "../select/select.component";
import { DateComponent } from "../date/date.component";
import { RadiobuttonComponent } from "../radiobutton/radiobutton.component";
import { CheckboxComponent } from "../checkbox/checkbox.component";
```

Create a variable **componentMapper** which map the field types (**input**, **select**, **button**, **date**, **radiobutton**, **checkbox**) to the corresponding field component.

``` typescript
const componentMapper = {
input: InputComponent,
button: ButtonComponent,
select: SelectComponent,
date: DateComponent,
radiobutton: RadiobuttonComponent,
checkbox: CheckboxComponent
};
```

Change the selector attribute to ``[dynamicField]`` and create the ``@Input()`` binding variables **field** and **group** which receive the input from the parent component and assign it to the corresponding field component.

``` typescript
@Directive({
selector: '[dynamicField]'
})
export class DynamicFieldDirective {
@Input() field: FieldConfig;
@Input() group: FormGroup;
constructor() { }
}
```

Create a variable **componentRef** of type any. It maintains the instance of dynamically created component.

``` typescript
...
export class DynamicFieldDirective {
...
componentRef: any;
...
```

Let’s inject **“ComponentFactoryResolver”** and **“ViewContainerRef”** services in the constructor. The **ComponentFactoryResolver** will be used to resolve the component at run time. This service contains **resolveComponentFactory** method which can be used to create a component at run time. The **ViewContainerRef** to gain access to the view container of the element that will host the dynamically added component.

``` typescript
....
constructor(
private resolver: ComponentFactoryResolver,
private container: ViewContainerRef
) {}
.....
```

Implement **ngOnInit** lifecycle hook for creating the dynamic components.

``` typescript
export class DynamicFieldDirective implements OnInit {
...
ngOnInit() {
}
}
```

Inside the **ngOnInit** function, we need to perform following tasks.

- Use the **resolveComponentFactory** method of **ComponentFactoryResolver** to create the component factory based on field type defined in the configuration.
  
- Use the **createComponent** method of **ViewContainerRef** to create the component from the component factory.
  
- Pass **field** and **group** properties into dynamically created component via **this.componentRef.instance**.

``` typescript
export class DynamicFieldDirective implements OnInit {
...
ngOnInit() {
const factory = this.resolver.resolveComponentFactory(
componentMapper[this.field.type]
);
this.componentRef = this.container.createComponent(factory);
this.componentRef.instance.field = this.field;
this.componentRef.instance.group = this.group;
}
}
```

Now we will create a dynamic form which will group all dynamically created field components into a form and it aggregates the values of each field into object.

Create a directory **dynamic-form** inside **app/components/** directory.

```
cd dynamic-form
```

## DynamicForm

Create a component called dynamic-form under **app/components** directory and import it to **app.module.ts**.

```
ng generate component components/dynamic-form --inline-style=true --inline-template=true --spec=false --module app
```

Let’s add all the necessory code in **/app/components/dynamic-form/dynamic-form.directive.ts**.

Import all necessary modules by adding the below code.

``` typescript
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { FieldConfig, Validator } from "../../field.interface";
```

Add the below code in the template to create a reactive form. It uses the **ng-container** element to repeat the **dynamicField** directive binding.

``` typescript
...
template: `
<form class="dynamic-form" [formGroup]="form" (submit)="onSubmit($event)">
<ng-container *ngFor="let field of fields;" dynamicField [field]="field" [group]="form">
</ng-container>
</form>
`
...
```

Create the following variables.

- `@Input()` **fields** of type FieldConfig that accept a configuration array from parent component.

- `@Output()` **submit** of type `EventEmitter<any>` it will notify the parent component when the form is submitted.

- **form** of type FormGroup it aggregates the values of each child FormControl .

``` typescript
...
@Input() fields: FieldConfig[] = [];
@Output() submit: EventEmitter<any> = new EventEmitter<any>();
form: FormGroup;
...
```

Use get to return the form value. It can be accessible from parent component.

``` typescript
...
get value() {
return this.form.value;
}
...
```

Let’s inject FormBuilder in the constructor.

``` typescript
...
export class DynamicFormComponent implements OnInit {
...
constructor(private fb: FormBuilder) {}
...
}
```

Add below code to create a control. It loops through the configuration fields and creates a control for each field with validations and then add these dynamically created controls to the form group.

``` typescript
export class DynamicFormComponent implements OnInit {
...
createControl() {
const group = this.fb.group({});
this.fields.forEach(field => {
if (field.type === "button") return;
const control = this.fb.control(
field.value,
this.bindValidations(field.validations || [])
);
group.addControl(field.name, control);
});
return group;
}
...
}
```

Add below code to add validations to dynamic control.

``` typescript
...
bindValidations(validations: any) {
if (validations.length > 0) {
const validList = [];
validations.forEach(valid => {
validList.push(valid.validator);
});
return Validators.compose(validList);
}
return null;
}
...
```

Call createControl method inside the ngOnInit. It creates the control dynamically and returns the FormGroup.

``` typescript
...
ngOnInit() {
this.form = this.createControl();
}
...
```

Add the below code to implement the submit functionality. if the form is valid, the parent submit method is fired otherwise validation errors will be displayed.

``` typescript
...
onSubmit(event: Event) {
event.preventDefault();
event.stopPropagation();
if (this.form.valid) {
this.submit.emit(this.form.value);
} else {
this.validateAllFormFields(this.form);
}
}
...
```

Add below code to validate all form fields.

``` typescript
...
validateAllFormFields(formGroup: FormGroup) {
Object.keys(formGroup.controls).forEach(field => {
const control = formGroup.get(field);
control.markAsTouched({ onlySelf: true });
});
}
...
```

Add dynamically created components in entryComponents array in app.module.ts. It lets Angular to compile these components.

``` typescript
...
@NgModule({
...
,
entryComponents: [
InputComponent,
ButtonComponent,
SelectComponent,
DateComponent,
RadiobuttonComponent,
CheckboxComponent
]
})
...
```

Almost done. Now we will create a simple Registration form by using the dynamicform component.

Let’s add all the necessory code in **/app/app.component.ts**.

Import Validators, DynamicFormComponent, Component and FieldConfig.

``` typescript
import { Component, ViewChild} from "@angular/core";
import { Validators } from "@angular/forms";
import { FieldConfig } from "./field.interface";
import { DynamicFormComponent } from "./components/dynamic-form/dynamic-form.component";
```

Use `@ViewChild` decorator to inject a reference to dynamicform component.

``` typescript
@ViewChild(DynamicFormComponent) form: DynamicFormComponent;
```

Create a variable **RegConfig** type of FieldConfig array. It describes the structure (**fields and properties**) of the form. The field properties will be varying for different type of fields.

``` typescript
regConfig: FieldConfig[] = [
{
type: "input",
label: "Username",
inputType: "text",
name: "name",
validations: [
{
name: "required",
validator: Validators.required,
message: "Name Required"
},
{
name: "pattern",
validator: Validators.pattern("^[a-zA-Z]+$"),
message: "Accept only text"
}
]
},
{
type: "input",
label: "Email Address",
inputType: "email",
name: "email",
validations: [
{
name: "required",
validator: Validators.required,
message: "Email Required"
},
{
name: "pattern",
validator: Validators.pattern(
"^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"
),
message: "Invalid email"
}
]
},
{
type: "input",
label: "Password",
inputType: "password",
name: "password",
validations: [
{
name: "required",
validator: Validators.required,
message: "Password Required"
}
]
},
{
type: "radiobutton",
label: "Gender",
name: "gender",
options: ["Male", "Female"],
value: "Male"
},
{
type: "date",
label: "DOB",
name: "dob",
validations: [
{
name: "required",
validator: Validators.required,
message: "Date of Birth Required"
}
]
},
{
type: "select",
label: "Country",
name: "country",
value: "UK",
options: ["India", "UAE", "UK", "US"]
},
{
type: "checkbox",
label: "Accept Terms",
name: "term",
value: true
},
{
type: "button",
label: "Save"
}
];
```

Add the below code in /app/app.component.html.

``` html
<div class="form">
<div style="text-align:center">
<h1>
Registration Form
</h1>
</div>
<dynamic-form [fields]="regConfig" (submit)="submit($event)">
</dynamic-form>
<div class="margin-top">
{{ form.value | json }}
</div>
</div>
```

Add the below css code in style.css.

``` css
body {
margin: 0;
}
.demo-full-width {
width: 100%;
}
.margin-top {
margin-top: 15px;
}
.margin-left {
margin-left: 10px;
}
.radio-label-padding {
padding-right: 10px;
color: grey;
}
.form {
margin-left: 10px;
border: 2px solid lightgray;
width: 600px;
padding-left: 5px;
margin-top: 10px;
}
```

Run the application.

```
ng serve
```

Now the web server is started and the dynamically created Registration form can be accessed on http://localhost:4200 as you see in the below screenshot.
