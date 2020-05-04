import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';
import { StorageService } from './../../Services/storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public showAdminPanel: boolean;
  public UserData: any;
  constructor(private userService: UserService, private storage: StorageService) { }

  ngOnInit() {
    if (this.userService.isAdmin) {
      this.userService.fetchAllUserProfile().subscribe(res => {
        this.UserData = res;
        this.showAdminPanel = true;
      });
    } else {
      const email = atob(this.storage.GetCookie('TR_001'));
      this.userService.getUserDetails(email).subscribe(res => {
        this.UserData = res;
        this.showAdminPanel = false;
      });
    }
  }

}
