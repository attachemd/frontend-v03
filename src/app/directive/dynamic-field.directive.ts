import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewContainerRef,
} from '@angular/core';
import { AlertComponent } from '../component/alert/alert.component';

@Directive({
  selector: '[appDynamicField]',
})
export class DynamicFieldDirective implements OnInit {
  @Input()
  public type: string = '';

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
    this.componentRef = this._viewContainerRef.createComponent(AlertComponent);
    this.componentRef.instance.type = this.type;
    console.log('this.type');
    console.log(this.type);

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
