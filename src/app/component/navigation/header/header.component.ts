import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { roles } from 'src/app/common/roles/roles.enum';
import { UserGroupsService } from 'src/app/common/roles/user-groups.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output()
  public sidenavToggle: EventEmitter<void> = new EventEmitter<void>();

  public isAuthenticated: boolean | string = false;
  public _authSubscription: Subscription = new Subscription();
  constructor(
    private _authService: AuthService,
    private _userGrpService: UserGroupsService
  ) {
    // this._authService.setAuthChange(this._authService.isAuthenticatedState());
  }

  ngOnInit(): void {
    this._authSubscription = this._authService.getAuthChange$().subscribe({
      next: (authStats) => {
        this.isAuthenticated = authStats;
        console.log('this.isAuthenticated');
        console.log(this.isAuthenticated);
      },
      error: (error) => {
        console.log('error :', error);
      },
    });
    this._authService.setAuthChange$(this._authService.isAuthenticatedState());
  }

  public onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  public onLogout(): void {
    this._authService.logout();
  }

  ngOnDestroy() {
    this._authSubscription.unsubscribe();
  }
}
