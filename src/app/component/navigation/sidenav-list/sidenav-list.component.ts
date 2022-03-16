import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss'],
})
export class SidenavListComponent implements OnInit, OnDestroy {
  @Output()
  public closeSideNav: EventEmitter<void> = new EventEmitter<void>();

  public isAuth: boolean = false;
  public authSubscription: Subscription = new Subscription();
  constructor(private _authService: AuthService) {}

  ngOnInit(): void {
    this.authSubscription = this._authService.getAuthChange$().subscribe({
      next: (authStats) => {
        this.isAuth = authStats;
      },
      error: (error) => {
        console.log('error :', error);
      },
    });
  }

  public onLogout(): void {
    this.onClose();
  }

  public onClose() {
    this.closeSideNav.emit();
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
}
