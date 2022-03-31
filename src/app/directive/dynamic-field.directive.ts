// https://fireflysemantics.medium.com/subscribing-to-dynamic-component-eventemitters-4f931a5013e3
// https://stackoverflow.com/questions/54193386/output-from-dynamically-created-component-in-angular-6
// https://www.tektutorialshub.com/angular/elementref-in-angular/

import { Directive, Input, OnInit, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InputComponent } from '../component/dnd-field/input/input.component';
import { RadioButtonComponent } from '../component/dnd-field/radio-button/radio-button.component';
import { FieldConfig } from '../services/dnd-field/field.model';

const componentMapper = {
  input: InputComponent,
  radiobutton: RadioButtonComponent,
};

@Directive({
  selector: '[appDynamicField]',
})
export class DynamicFieldDirective implements OnInit {
  @Input()
  public field!: FieldConfig;

  @Input()
  public group!: FormGroup;

  public componentRef: any;
  constructor(private _viewContainerRef: ViewContainerRef) {}

  ngOnInit(): void {
    this.componentRef = this._viewContainerRef.createComponent(
      (componentMapper as any)[this.field.type]
    );

    this.componentRef.instance.field = this.field;
    this.componentRef.instance.group = this.group;
  }
}
