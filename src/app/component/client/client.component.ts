import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent implements OnInit {
  @ViewChild('alertContainer', { read: ViewContainerRef })
  public viewContainerRef: ViewContainerRef = {} as ViewContainerRef;

  public componentRef: any;
  constructor() {}

  ngOnInit(): void {
    console.log('ClientComponent');
  }
}
