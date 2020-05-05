import { Component, OnInit, Input, EventEmitter, Output, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../../Services/user.service';
import { Router } from '@angular/router';
import { StorageService } from '../../Services/storage.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  public showSucessMessage: boolean;
  public serverErrorMessages: string;
  @ViewChild('CloseModal', { static: false }) CloseModal: ElementRef;
  public SignUpForm: FormGroup;
  public email: FormControl;
  public name: FormControl;
  public phone: FormControl;
  public role: FormControl;
  constructor(public userService: UserService, protected router: Router, protected storage: StorageService, private fb: FormBuilder) { }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.email = new FormControl('', [Validators.required, Validators.pattern('[A-Za-z0-9]{3,}(?!.*([._%+-])\\1)([a-zA-Z0-9._%+-]*[a-zA-Z0-9])@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})')]);
    this.phone = new FormControl('', [Validators.required, Validators.pattern('[6-9]{1}[0-9]{9}')]);
    this.name = new FormControl('', [Validators.required, Validators.pattern('[a-zA-z ]+')]);
    this.role = new FormControl('Normal', [Validators.required, Validators.pattern('[a-zA-Z]+'), Validators.maxLength(6)]);
  }

  createForm() {
    this.SignUpForm = this.fb.group({
      email: this.email,
      phone: this.phone,
      name: this.name,
      role: this.role
    });
  }

  onSubmit() {
    if (this.SignUpForm.valid) {
      this.userService.postUser(this.SignUpForm.value).subscribe((res) => {
        if (res.status === true) {
          alert('User Created successfully');
          this.resetForm();
          this.CloseModal.nativeElement.click();
        }
      }, err => {
        this.errorHandler(err);
      });
    }
  }

  errorHandler(err) {
    if (err.status === 422) {
      this.serverErrorMessages = err.error.join('<br/>');
    } else if (err.message && err.message.code === 11000) {
      this.serverErrorMessages = 'Duplicate Emails Found';
    } else {
      this.serverErrorMessages = 'Something went wrong.Please contact admin.';
    }
  }

  resetForm() {
    this.SignUpForm.reset();
    this.SignUpForm.markAsUntouched();
    this.serverErrorMessages = '';
  }
}
