// Importing Module
import { NgModule } from '@angular/core';
// Inbuild modules
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

// Service
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';

// Components
import { AppComponent } from './app.component';
import { ForgotPasswordComponent } from './Login/forgot-password/forgot-password.component';
import { SignUpComponent } from './Login/sign-up/sign-up.component';
import { SignInComponent } from './Login/sign-in/sign-in.component';
import { FieldErrorDisplayComponent } from './Login/field-error-display/field-error-display.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderComponent } from './common/header/header.component';
import { UserprofileComponent } from './components/dashboard/userprofile/userprofile.component';
import { AdminComponent } from './components/dashboard/admin/admin.component';
import { CookieService } from 'ngx-cookie-service';
@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    SignInComponent,
    ForgotPasswordComponent,
    FieldErrorDisplayComponent,
    DashboardComponent,
    HeaderComponent,
    UserprofileComponent,
    AdminComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }, AuthGuard, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
