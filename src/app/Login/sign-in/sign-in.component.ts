import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../Services/user.service';
import { AppComponent } from '../../app.component';
import { StorageService } from '../../Services/storage.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-component.scss'],
  providers: [AppComponent]
})
export class SignInComponent implements OnInit {
  protected email: FormControl;
  protected password: FormControl;
  public loginForm: FormGroup;
  public formSumitAttempt: boolean;
  public serverErrorMessages: any;

  constructor(private userService: UserService, private router: Router, private fb: FormBuilder, private storage: StorageService) { }

  ngOnInit() {
    this.createFormControl();
    this.createControls();
  }
  createFormControl() {
    this.email = new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}')]);
    this.password = new FormControl('', Validators.required);
  }

  createControls() {
    this.loginForm = this.fb.group({
      email: this.email,
      password: this.password
    });
  }

  isFieldValid(field: string) {
    return (
      (!this.loginForm.get(field).valid && this.formSumitAttempt));
  }

  /**
   * Displays field css
   * @param field returns the field which has an error
   *
   */
  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }

  onSubmit() {
    this.userService.login(this.loginForm.value).subscribe(
      res => {
        this.storage.SetCookie('TR_001', btoa(this.email.value));
        this.storage.SetCookie('token', res.token);
        this.router.navigate(['/dashboard']);
      },
      err => {
        this.serverErrorMessages = err.error.message;
      }
    );
  }

}
