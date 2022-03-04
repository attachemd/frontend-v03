import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss'],
})
export class SidenavListComponent implements OnInit {
  @Output()
  public closeSideNav: EventEmitter<void> = new EventEmitter<void>();

  public isAuth: boolean = false;
  constructor() {}

  ngOnInit(): void {
    console.log('SidenavListComponent');
  }

  public onLogout(): void {
    this.onClose();
  }

  public onClose() {
    this.closeSideNav.emit();
  }
}
