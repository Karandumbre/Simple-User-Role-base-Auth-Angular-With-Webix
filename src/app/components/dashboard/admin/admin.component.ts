import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  @Input() UserData: any;
  public keys = [];
  public user = {};
  public showUserModal = false;
  public showTableDashboard = false;
  public ChildConfig = { message: '', toUpdate: 'false' };
  constructor(private userService: UserService) { }

  ngOnInit() {
    if (Array.isArray(this.UserData.users) && this.UserData.users.length > 0) {
      this.keys = Object.keys(this.UserData.users[0]);
      this.showTableDashboard = true;
    } else {
      this.showTableDashboard = false;
    }
  }

  editUserData(id) {
    if (id === null) {
      this.user = {
        email: '',
        fullName: '',
        phone: '',
        role: ['Normal']
      };
      this.ChildConfig.message = 'Create User';
      this.ChildConfig.toUpdate = 'false';
    } else {
      this.ChildConfig.message = 'Save Details';
      this.ChildConfig.toUpdate = 'true';
      this.user = this.UserData.users[id];
    }

    this.showUserModal = true;
  }

  closeModal() {
    setTimeout(() => {
      this.showUserModal = false;
    }, 0);
  }

  deleteUser(i) {
    const email = this.UserData.users[0].email;
    this.userService.deleteUser(email).subscribe(res => {
      if (res.status === true) {
        alert(res.message);
      }
    });
  }

}

