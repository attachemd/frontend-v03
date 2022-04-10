import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './common/guards/auth.guard';
import { EntryGuard } from './common/guards/entry.guard';
import { LoginComponent } from './component/auth/login/login.component';
import { SignupComponent } from './component/auth/signup/signup.component';
import { ClientComponent } from './component/client/client.component';
import { HomeComponent } from './component/home/home.component';
import { LicenseComponent } from './component/license/license.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { ProductComponent } from './component/product/product.component';
import { CustomFieldsComponent } from './management/custom-fields/custom-fields.component';
import { LicenseEditComponent } from './management/license-edit/license-edit.component';
import { ProductEditComponent } from './management/product-edit/product-edit.component';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
  },
  {
    path: 'home',
    component: HomeComponent,
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
  },
  {
    path: 'licenses',
    component: LicenseComponent,
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
  },
  {
    path: 'licenses/:id',
    component: LicenseEditComponent,
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
  },
  {
    path: 'clients',
    component: ClientComponent,
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
  },
  {
    path: 'products',
    component: ProductComponent,
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
  },
  {
    path: 'products/:id',
    component: ProductEditComponent,
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
  },
  {
    path: 'products/:id',
    component: ProductEditComponent,
    outlet: 'edit',
  },
  {
    path: 'products/custom-fields/:id',
    component: CustomFieldsComponent,
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canLoad: [EntryGuard],
    canActivate: [EntryGuard],
  },
  {
    path: 'signup',
    component: SignupComponent,
    canLoad: [EntryGuard],
    canActivate: [EntryGuard],
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
