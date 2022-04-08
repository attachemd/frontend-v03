import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Product } from 'src/app/services/products/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort, { static: true })
  private _sort!: MatSort;

  @ViewChild(MatPaginator)
  private _paginator!: MatPaginator;

  public isVisible = true;
  public displayedColumns = ['name', 'description', 'action'];

  public dataSource = new MatTableDataSource<Product>();

  constructor(private _http: HttpClient, private _sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    console.log('ProductComponent');
    this._http.get<Product[]>('/api/products').subscribe({
      next: (products: Product[]): void => {
        console.log('products');
        console.log(products);
        let newProduct = [...products];

        this.dataSource.data = newProduct;
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
          return item.client.first_name + ' ' + item.client.last_name;
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

  public toggleEditVisibility(event: any, visibility: string) {
    event.target.querySelector('button').style.display = visibility;
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
