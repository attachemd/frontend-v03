import { Directive, Input, OnInit, ViewContainerRef } from '@angular/core';
import { AlertComponent } from '../component/alert/alert.component';

@Directive({
  selector: '[appDynamicField]',
})
export class DynamicFieldDirective implements OnInit {
  @Input()
  public type: string = '';

  public componentRef: any;
  constructor(private _viewContainerRef: ViewContainerRef) {}

  ngOnInit(): void {
    this.componentRef = this._viewContainerRef.createComponent(AlertComponent);
    this.componentRef.instance.type = this.type;
  }
}
