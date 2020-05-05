import { Component, OnInit } from '@angular/core';
import { UserService } from './../../Services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  logout() {
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
    this.userService.deleteToken();
  }
}
