import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert',
  template: ` <h1>Alert {{ type }}</h1> `,
  styles: [],
})
export class AlertComponent implements OnInit {
  @Input()
  public type: string = 'success';

  constructor() {}

  ngOnInit(): void {
    console.log('AlertComponent');
  }
}
