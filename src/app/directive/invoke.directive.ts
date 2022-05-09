import {
  AfterContentInit,
  Directive,
  EventEmitter,
  Output,
} from '@angular/core';

@Directive({ selector: '[appInvoke]' })
export class InvokeDirective implements AfterContentInit {
  @Output()
  public appInvoke = new EventEmitter();

  ngAfterContentInit() {
    this.appInvoke.emit(null);
  }
}
