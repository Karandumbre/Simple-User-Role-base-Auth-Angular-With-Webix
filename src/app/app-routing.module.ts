import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { SignUpComponent } from './Login/sign-up/sign-up.component';
import { SignInComponent } from './Login/sign-in/sign-in.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [{
  path: '',
  redirectTo: 'login',
  pathMatch: 'full'
}, {
  path: 'login', component: SignInComponent
}, {
  path: 'dashboard',
  component: DashboardComponent,
  canActivate: [AuthGuard],
  children: [{
    path: 'register', component: SignUpComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled', useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
