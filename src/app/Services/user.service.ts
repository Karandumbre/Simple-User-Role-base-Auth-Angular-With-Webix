import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { User } from './user.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public selectedUser: User = {
    fullName: '',
    email: '',
    password: '',
    phone: '',
    role: []
  };
  public isAdmin = false;
  public noAuthHeader = { headers: new HttpHeaders({ NoAuth: 'True' }) };

  constructor(private http: HttpClient, private router: Router, private storage: StorageService) {

  }

  // HttpMethods

  postUser(user: User): Observable<any> {
    return this.http.post<any>(environment.apiBaseUrl + 'register', user);
  }

  login(authCredentials): Observable<any> {
    return this.http.post<any>(environment.apiBaseUrl + 'authenticate', authCredentials, this.noAuthHeader);
  }

  saveOrUpdateUserDetails(data) {
    return this.http.post<any>(environment.apiBaseUrl + 'updateUserDetails', data);
  }


  deleteToken() {
    this.storage.FlushAll();
  }

  getUserDetails(id): Observable<any> {
    return this.http.post<any>(environment.apiBaseUrl + 'fetchUserProfile', { id });
  }

  resetPassword(data) {
    return this.http.post<any>(environment.apiBaseUrl + 'resetPassword', data);
  }

  fetchAllUserProfile(): Observable<any> {
    return this.http.get<any>(environment.apiBaseUrl + 'fetchAllUserProfile');
  }

  deleteUser(id): Observable<any> {
    return this.http.post<any>(environment.apiBaseUrl + 'deleteUser', { email: id });
  }

  getUserPayload() {
    const token = this.storage.GetCookie('token');
    if (token) {
      const userPayload = atob(token.split('.')[1]);
      const role = JSON.parse(userPayload).role;
      if (role.includes('Admin')) {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }

      return JSON.parse(userPayload);
    } else {
      return null;
    }
  }

  isLoggedIn() {
    const userPayload = this.getUserPayload();
    if (userPayload) {
      return userPayload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }



}
