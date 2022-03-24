import {
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent implements OnInit, OnDestroy {
  @ViewChild('alertContainer', { read: ViewContainerRef })
  public viewContainerRef: ViewContainerRef = {} as ViewContainerRef;

  public componentRef: any;
  constructor(private _resolver: ComponentFactoryResolver) {}

  public createComponent(type: string) {
    this.viewContainerRef.clear();
    // const factory = this._resolver.resolveComponentFactory(AlertComponent);

    // this.componentRef = this.viewContainerRef.createComponent(factory);
    this.componentRef = this.viewContainerRef.createComponent(AlertComponent);
    this.componentRef.instance.type = type;
  }

  ngOnInit(): void {
    console.log('ClientComponent');
  }

  ngOnDestroy() {
    this.componentRef?.destroy();
  }
}
