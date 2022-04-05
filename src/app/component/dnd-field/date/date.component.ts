import { Component, HostBinding, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss'],
})
export class DateComponent implements OnInit {
  @HostBinding('class.ongoing')
  public isOngoing: boolean = false;

  public field: any = {};
  public group!: FormGroup;
  public visibility = 'none';
  // public dob = new FormControl(new Date());
  // public dob = new FormControl(new Date('4/14/2022'));
  constructor() {}

  ngOnInit(): void {
    this.isOngoing = this.field.isOngoing;
    // this.group.addControl(
    //   'dob',
    //   new FormControl(new Date(), Validators.required)
    // );
    console.log("this.group.get('dob')");
    console.log(this.group.get('dob'));
    // this.group.get('dob')!.value = '4/20/2022'
  }
}
