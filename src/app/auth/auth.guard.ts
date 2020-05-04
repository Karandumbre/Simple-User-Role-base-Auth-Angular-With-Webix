import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UserService } from '../Services/user.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) { }

  canActivate(): boolean {
    if (!this.userService.isLoggedIn()) {
      this.router.navigateByUrl('/login');
      this.userService.deleteToken();
      return false;
    }
    return true;
  }
}
