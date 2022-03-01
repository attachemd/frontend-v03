import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {
  @Output()
  public closeSideNav: EventEmitter<void> = new EventEmitter<void>();
  public isAuth: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  onLogout(): void {
    this.onClose();
  }

  onClose() {
    this.closeSideNav.emit()
  }

}
