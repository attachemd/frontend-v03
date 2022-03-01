import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output()
  public sidenavToggle: EventEmitter<void> = new EventEmitter<void>();
  public isAuthenticated: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  onLogout(): void {

  }

}
