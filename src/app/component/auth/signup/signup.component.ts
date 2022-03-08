import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  public maxDate: Date = new Date();
  public isLoading: boolean = false;
  constructor(private _authService: AuthService, private _router: Router) {
    // if (this._authService.isAuthenticatedState()) this._router.navigate(['/']);
  }

  ngOnInit(): void {
    console.log('SignupComponent');
  }

  public onSubmit(form: NgForm) {}
}
