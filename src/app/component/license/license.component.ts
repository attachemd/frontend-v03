import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { License } from 'src/app/services/licenses/license.model';

@Component({
  selector: 'app-license',
  templateUrl: './license.component.html',
  styleUrls: ['./license.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LicenseComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort, { static: true })
  private _sort!: MatSort;

  @ViewChild(MatPaginator)
  private _paginator!: MatPaginator;

  public displayedColumns = [
    'key',
    'status',
    'expiry',
    'client',
    'product',
    'action',
  ];

  public dataSource = new MatTableDataSource<License>();

  constructor(private _http: HttpClient, private _sanitizer: DomSanitizer) {}

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
        case 'client':
          return item.account.first_name + ' ' + item.account.last_name;
        default:
          return item[property];
      }
    };
    this.dataSource.sort = this._sort;
    this.dataSource.paginator = this._paginator;
  }

  public viewContact(row: any) {}
  public editContact(row: any) {
    console.log('row');
    console.log(row);
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

  public setStatus(element: any): SafeHtml {
    return element.status
      ? this._sanitizer.bypassSecurityTrustHtml(
          '<span title="active" class="status status-active"></span>'
        )
      : this._sanitizer.bypassSecurityTrustHtml(
          '<span title="inactive" class="status status-inactive"></span>'
        );
  }
}
