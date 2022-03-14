import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { License } from 'src/app/services/licenses/license.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public currentTab: string = 'Tab1';
  public displayedColumns = ['key'];
  public dataSource = new MatTableDataSource<License>();
  constructor(private _http: HttpClient) {}

  ngOnInit(): void {
    console.log('HomeComponent');
    this._http.get<License[]>('/api/licenses').subscribe({
      next: (licenses: License[]): void => {
        // this.dataSource.data = [...licenses];
        this.dataSource.data = licenses;
      },
      error: (error) => {
        console.log('error :', error);
      },
    });
  }
}
