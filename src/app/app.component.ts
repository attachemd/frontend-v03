import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AppService } from './services/app.service';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav01')
  public sidenav01!: ElementRef;

  public title = 'frontend-v03';
  public isOpened01 = true;
  public isOpened = false;
  public _authSubscription: Subscription = new Subscription();
  constructor(
    private _authService: AuthService,
    private _cd: ChangeDetectorRef,
    private _appService: AppService
  ) {
    // this._authService.setAuthChange(this._authService.isAuthenticatedState());
  }

  ngOnInit() {
    this._appService.getOpenEditSideNav$().subscribe({
      next: (isOpened) => {
        this.isOpened01 = isOpened;
      },
      error: (err: any) => {
        console.log('error');
        console.log(err);
      },
    });

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
