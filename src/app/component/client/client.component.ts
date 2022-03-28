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
import { DnDFieldComponent } from '../dnd-field/dnd-field.component';

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
    // const factory = this._resolver.resolveComponentFactory(DnDFieldComponent);

    // this.componentRef = this.viewContainerRef.createComponent(factory);
    this.componentRef =
      this.viewContainerRef.createComponent(DnDFieldComponent);
    this.componentRef.instance.type = type;
  }

  ngOnInit(): void {
    console.log('ClientComponent');
  }

  ngOnDestroy() {
    this.componentRef?.destroy();
  }
}
