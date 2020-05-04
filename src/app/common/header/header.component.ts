import { Component, OnInit } from '@angular/core';
import { UserService } from './../../Services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public userService: UserService) { }

  ngOnInit() {
  }

  logout() {
    this.userService.deleteToken();
  }
}
