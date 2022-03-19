import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Client } from 'src/app/services/clients/client.model';
import { License } from 'src/app/services/licenses/license.model';
import { Product } from 'src/app/services/products/product.model';

@Component({
  selector: 'app-license-edit',
  templateUrl: './license-edit.component.html',
  styleUrls: ['./license-edit.component.scss'],
})
export class LicenseEditComponent implements OnInit {
  public status = false;
  public license = {} as License;
  public clients = [] as Client[];
  public products = [] as Product[];
  public selectedClientId = '';
  constructor(private _http: HttpClient, private _route: ActivatedRoute) {}

  ngOnInit(): void {
    this._route.params.subscribe({
      next: (params: any) => {
        console.log(
          '%c ActivatedRoute ',
          'background: #B8FF13; ' +
            'color: #000; ' +
            'padding: 10px; ' +
            'border: 1px solid #47C0BE'
        );
        // this.id = params['id'];
        this._http.get<License>('/api/licenses/' + params['id']).subscribe({
          next: (license: License): void => {
            console.log('license');
            console.log(license);
            this.license = license;
            this.selectedClientId = this.license.client.id;
            this._http.get<Client[]>('/api/clients').subscribe({
              next: (clients: Client[]): void => {
                console.log('clients');
                console.log(clients);
                this.clients = clients;
              },
              error: (error) => {
                console.log('error :', error);
              },
            });
            this._http.get<Product[]>('/api/products').subscribe({
              next: (products: Product[]): void => {
                console.log('products');
                console.log(products);
                this.products = products;
              },
              error: (error) => {
                console.log('error :', error);
              },
            });
          },
          error: (error) => {
            console.log('error :', error);
          },
        });
      },
      error: (error) => {
        console.log('error :', error);
      },
    });
    // console.log('history.state');
    // console.log(history.state);
    // this._http.get<License>('/api/licenses/' + history.state.id).subscribe({
    //   next: (license: License): void => {
    //     console.log('license');
    //     console.log(license);
    //     this.license = license;
    //   },
    //   error: (error) => {
    //     console.log('error :', error);
    //   },
    // });
  }
}
