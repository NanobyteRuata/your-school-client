import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResponseModel } from 'src/app/shared/models/response-model';
import { AuthenticationApiService } from '../../services/authentication-api.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;
  isSubmitLoading: boolean = false;

  constructor(
    private _authenticationApiService: AuthenticationApiService,
    private _router: Router
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  ngOnInit(): void {}

  onClearClick(control: string) {
    this.loginForm.patchValue({ [control]: '' });
  }

  onForgotPasswordClick(event: Event) {
    // because event is coming from an <a> tag with href property,
    // the page will reload if not preventDefault()
    event.preventDefault();
    this._router.navigateByUrl('/auth/forgot-password');
  }

  onSignUpClick(event: Event) {
    // because event is coming from an <button> inside <form>,
    // it could try to submit if not preventDefault()
    event.preventDefault();
    this._router.navigateByUrl('/auth/sign-up');
  }

  checkFieldValidity(control: string) {
    return this.loginForm.controls[control].invalid;
  }

  getFieldInvalidMessage(control: string) {
    if (control == 'email') {
      if (this.loginForm.controls['email'].hasError('required')) {
        return 'You must enter your email';
      }
      if (this.loginForm.controls['email'].hasError('email')) {
        return 'Not a valid email';
      }
    }

    if (control == 'password') {
      if (this.loginForm.controls['password'].hasError('required')) {
        return 'You must enter your password';
      }
      if (this.loginForm.controls['password'].hasError('minlength')) {
        return 'Password is too short';
      }
    }

    return '';
  }

  @HostListener('keydown', ['$event'])
  onKeyDown = (event: KeyboardEvent) => {
    console.log(event);
    if (event.key === 'Enter') {
      event.preventDefault();
      this.onLoginSubmit();
    }
  };

  onLoginSubmit() {
    if (this.loginForm.valid) {
      this.isSubmitLoading = true;
      this.signIn(
        this.loginForm.value['email'],
        this.loginForm.value['password']
      );
    }
  }

  signIn = async (email: string, password: string) => {
    const response: ResponseModel = await this._authenticationApiService.signIn(
      email,
      password
    );
    this.handleSignIn(response);
  };

  handleSignIn = (response: ResponseModel) => {
    if (response.success) {
      this._router.navigateByUrl('');
    } else {
      alert(response.message);
    }
    this.isSubmitLoading = false;
  };
}
