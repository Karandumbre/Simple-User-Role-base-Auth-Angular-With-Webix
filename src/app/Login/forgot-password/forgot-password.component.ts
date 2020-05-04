import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  email: any;
  showPasswordField: boolean;
  password: string;
  confirmPassword: string;
  constructor(protected us: UserService) { }

  resetpassword() {
    if (this.password && this.confirmPassword) {
      if (this.password === this.confirmPassword) {
        this.us.resetPassword({ id: this.email, password: this.password }).subscribe(res => {
          if (res.status === true) {
            alert('Password Resseted Successfully');
          } else {
            alert('Sorry for the inconvenience, Please try again later');
          }
        });
      } else {
        alert('Password does not match');
      }
    } else {
      alert('Please fill all the fields');
    }
  }
  ngOnInit() {
  }

}
