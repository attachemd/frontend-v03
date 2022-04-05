import { Component, HostBinding, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit {
  @HostBinding('class.ongoing')
  public isOngoing: boolean = false;

  public field!: any;
  public group!: FormGroup;
  public visibility = 'none';
  constructor() {}

  ngOnInit(): void {
    console.log('SelectComponent');
    this.isOngoing = this.field.isOngoing;
  }
}
