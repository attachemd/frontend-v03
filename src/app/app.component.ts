import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  public title = 'frontend-v03';
  public isOpened = false;
  public _authSubscription: Subscription = new Subscription();
  constructor(
    private _authService: AuthService,
    private _cd: ChangeDetectorRef
  ) {
    // this._authService.setAuthChange(this._authService.isAuthenticatedState());
  }

  ngOnInit() {
    this._authSubscription = this._authService.getAuthChange$().subscribe({
      next: (authStats) => {
        this.isOpened = authStats;
        // https://angular.io/errors/NG0100
        this._cd.detectChanges();
      },
      error: (error) => {
        console.log('error :', error);
      },
    });
  }

  ngOnDestroy() {
    this._authSubscription.unsubscribe();
  }
}
