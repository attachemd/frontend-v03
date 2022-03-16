import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { License } from 'src/app/services/licenses/license.model';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort, { static: true })
  private _sort!: MatSort;

  @ViewChild(MatPaginator)
  private _paginator!: MatPaginator;

  public currentTab: string = 'Tab1';
  public displayedColumns = ['key', 'status', 'expiry', 'account', 'product'];

  public dataSource = new MatTableDataSource<License>();

  constructor(private _http: HttpClient) {}

  ngOnInit(): void {
    console.log('HomeComponent');
    this._http.get<License[]>('/api/licenses').subscribe({
      next: (licenses: License[]): void => {
        // this.dataSource.data = [...licenses];
        console.log('licenses');
        console.log(licenses);
        let newLicense = [...licenses];

        // for (const item of newLicense) {
        //   item.customer =
        //     item.account.first_name + ' ' + item.account.last_name;
        //   item.iproduct = item.product.name;
        // }

        // let expiryFormated: Date | string = new Date(newLicense.expiry);
        // let options: Intl.DateTimeFormatOptions = {
        //   weekday: 'long',
        //   year: 'numeric',
        //   month: 'long',
        //   day: 'numeric',
        // };
        // newLicense.expiry =
        // expiryFormated = expiryFormated.toLocaleDateString('en-US', options);

        this.dataSource.data = newLicense;
      },
      error: (error) => {
        console.log('error :', error);
      },
    });
  }

  ngAfterViewInit() {
    // https://stackoverflow.com/questions/48891174/angular-material-2-datatable-sorting-with-nested-objects
    this.dataSource.sortingDataAccessor = (item: any, property) => {
      switch (property) {
        case 'product':
          return item.product.name;
        case 'account':
          return item.account.first_name + ' ' + item.account.last_name;
        default:
          return item[property];
      }
    };
    this.dataSource.sort = this._sort;
    this.dataSource.paginator = this._paginator;
  }

  public doFilter(event: KeyboardEvent) {
    // https://stackoverflow.com/questions/49833315/angular-material-2-datasource-filter-with-nested-object
    // TODO status not filtered
    this.dataSource.filterPredicate = (data: any, filter) => {
      const dataStr = JSON.stringify(data).toLowerCase();

      return dataStr.indexOf(filter) != -1;
    };
    this.dataSource.filter = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
  }
}
