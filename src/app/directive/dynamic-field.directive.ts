import { ComponentType } from '@angular/cdk/portal';
import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewContainerRef,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DnDFieldComponent } from '../component/dnd-field/dnd-field.component';
import { InputComponent } from '../component/dnd-field/input/input.component';
import { FieldConfig } from '../services/dnd-field/field.model';

const componentMapper = {
  input: InputComponent,
};

@Directive({
  selector: '[appDynamicField]',
})
export class DynamicFieldDirective implements OnInit {
  @Input()
  public field!: FieldConfig;

  @Input()
  public group!: FormGroup;

  @Input()
  public type: string = '';

  @Input()
  public content: string = '';

  @Input()
  public isOngoing = false;

  @Input()
  public fieldData: any = {};

  @Output()
  public fieldChange_ = new EventEmitter();

  public componentRef: any;
  constructor(
    private _viewContainerRef: ViewContainerRef,
    private _elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    console.log('/*/*/*/*/*/*/*/*/*/*/*/*');
    console.log((componentMapper as any)[this.field.type]);
    console.log('this.field.type');
    console.log(this.field.type);

    this.componentRef = this._viewContainerRef.createComponent(
      (componentMapper as any)[this.field.type]
    );
    // this.componentRef.instance.type = this.type;
    // this.componentRef.instance.content = this.content;
    // this.componentRef.instance.isOngoing = this.isOngoing;
    this.componentRef.instance.field = this.field;
    this.componentRef.instance.group = this.group;
    // this.componentRef.instance.fieldData = this.fieldData;

    // console.log('this.type');
    // console.log(this.type);

    // this.componentRef.instance.fieldChange.subscribe((val: any) => {
    //   console.log('val');
    //   console.log(val);
    //   this.onFieldNameChanged_();
    // });
    this._elementRef.nativeElement.fieldData = this.fieldData;
  }

  public onFieldNameChanged_() {
    console.log('onFieldNameChanged');

    let parmtr = 'new parameter from dynamic field';

    this.fieldChange_.emit(parmtr);
  }
}
