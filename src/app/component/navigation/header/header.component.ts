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
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output()
  public sidenavToggle: EventEmitter<void> = new EventEmitter<void>();

  public isAuthenticated: boolean = false;
  public authSubscription: Subscription = new Subscription();
  constructor(private _authService: AuthService) {}

  ngOnInit(): void {
    this.authSubscription = this._authService.getAuthChange().subscribe({
      next: (authStats) => {
        this.isAuthenticated = authStats;
      },
      error: (error) => {
        console.log('error :', error);
      },
    });
  }

  public onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  public onLogout(): void {}

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
}
