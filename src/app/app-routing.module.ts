import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './common/guards/auth.guard';
import { EntryGuard } from './common/guards/entry.guard';
import { LoginComponent } from './component/auth/login/login.component';
import { SignupComponent } from './component/auth/signup/signup.component';
import { HomeComponent } from './component/home/home.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
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
