import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  public maxDate: Date = new Date();
  public isLoading: boolean = false;
  constructor() {}

  ngOnInit(): void {
    console.log('SignupComponent');
  }

  public onSubmit(form: NgForm) {}
}
