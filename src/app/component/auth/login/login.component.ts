import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UIService } from 'src/app/services/ui.service';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup = new FormGroup({});
  public isLoading: boolean = false;
  private _loadingSubscription: Subscription = new Subscription();
  constructor(
    private _authService: AuthService,
    private _uiService: UIService,
    private _router: Router
  ) {
    // if (this._authService.isAuthenticatedState()) this._router.navigate(['/']);
    this._authService.setAuthChange$(this._authService.isAuthenticatedState());
  }

  ngOnInit(): void {
    // if (this._authService.isAuthenticatedState()) this._router.navigate(['/']);
    this._loadingSubscription = this._uiService.getLoadingState().subscribe({
      next: (isLoadingState) => {
        this.isLoading = isLoadingState;
      },
      error: (error) => {
        console.log('error :', error);
      },
    });
    this.loginForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl('', {
        validators: [Validators.required],
      }),
    });
  }

  public onSubmit(): void {
    if (!this.loginForm.valid) return;

    this._authService
      .login({
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      })
      .subscribe({
        next: (isLogin) => {
          if (isLogin) this._authService.authSuccessfully();
        },
        error: (error) => {
          console.log('error');
          console.log(error);
          this._uiService.showSnackBar('error when login', undefined, 3000);
        },
      });
  }
}
