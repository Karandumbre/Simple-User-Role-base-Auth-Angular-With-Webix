import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../Services/user.service';
import { AppComponent } from '../../app.component';
import { StorageService } from '../../Services/storage.service';
declare var webix: any;
declare var $$: any;

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-component.scss'],
  providers: [AppComponent]
})
export class SignInComponent implements OnInit {
  @ViewChild('loginContainer', { static: false }) loginContainer: ElementRef;
  constructor(private userService: UserService, private router: Router, private storage: StorageService) { }

  ngOnInit() {
    this.loginWebixForm();
  }

  private loginWebixForm() {
    return webix.ui({
      rows: [
        {
          id: 'InitialloginForm',
          view: 'form',
          css: 'login',
          autoheight: true,
          borderless: true,
          elements: [
            {
              margin: 20,
              paddingY: 25,
              paddingX: 25,
              rows: [
                {
                  view: 'text', name: 'email', placeholder: 'Email Id',
                  label: 'Email', width: 300, labelWidth: 100
                },
                {
                  view: 'text', name: 'password', placeholder: 'Password',
                  label: 'Password', type: 'password', width: 300, labelWidth: 100
                },
                { view: 'button', css: 'login-button', label: 'Login', width: 300, click: () => this.formSave() }
              ]

            }
          ],
          rules: {
            email: webix.rules.isNotEmpty,
            password: webix.rules.isNotEmpty,
          },
          elementsConfig: {}
        }
      ]
    }).show();
  }



  formSave() {
    const formData = $$('InitialloginForm').getValues();
    const myform = $$('InitialloginForm');
    myform.validate({ hidden: true });
    this.userService.login(formData).subscribe(
      res => {
        this.storage.SetCookie('TR_001', btoa(formData.email));
        this.storage.SetCookie('token', res.token);
        this.router.navigate(['/dashboard']).then(() => {
          window.location.reload();
        });
      },
      err => {
        webix.message(err.error.message);
      }
    );
  }

}

