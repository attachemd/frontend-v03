import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert',
  template: `
    <h1 style="color: brown;">Alert {{ type }}</h1>
    <div class="ft-lm-edit-field">
      <mat-form-field fxFlex="500px">
        <input
          matInput
          type="text"
          placeholder="Key"
          [(ngModel)]="license.key"
        />
      </mat-form-field>
    </div>
  `,
  styles: [],
})
export class AlertComponent implements OnInit {
  @Input()
  public type: string = 'success';

  public license = { key: 'jsdfhfdhdfshklhf' };
  constructor() {}

  ngOnInit(): void {
    console.log('AlertComponent');
  }
}
