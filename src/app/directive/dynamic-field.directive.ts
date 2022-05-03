// https://fireflysemantics.medium.com/subscribing-to-dynamic-component-eventemitters-4f931a5013e3
// https://stackoverflow.com/questions/54193386/output-from-dynamically-created-component-in-angular-6
// https://www.tektutorialshub.com/angular/elementref-in-angular/

import { Directive, Input, OnInit, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CheckboxComponent } from '../component/dnd-field/checkbox/checkbox.component';
import { DateComponent } from '../component/dnd-field/date/date.component';
import { InputComponent } from '../component/dnd-field/input/input.component';
import { RadioButtonComponent } from '../component/dnd-field/radio-button/radio-button.component';
import { SelectComponent } from '../component/dnd-field/select/select.component';
import { FieldConfig } from '../services/dnd-field/field.model';

const componentMapper = {
  input: InputComponent,
  radiobutton: RadioButtonComponent,
  select: SelectComponent,
  checkbox: CheckboxComponent,
  date: DateComponent,
};

@Directive({
  selector: '[appDynamicField]',
})
export class DynamicFieldDirective implements OnInit {
  @Input()
  public field!: any;

  @Input()
  public group!: FormGroup;

  @Input()
  public index!: number;

  @Input()
  public data!: any;

  public componentRef: any;
  constructor(private _viewContainerRef: ViewContainerRef) {}

  ngOnInit(): void {
    this.componentRef = this._viewContainerRef.createComponent(
      (componentMapper as any)[
        this.field.form_element_template.form_element_type.name
      ]
    );

    this.componentRef.instance.field = this.field;
    this.componentRef.instance.group = this.group;
    this.componentRef.instance.index = this.index;
    this.componentRef.instance.data = this.data;
  }
}
