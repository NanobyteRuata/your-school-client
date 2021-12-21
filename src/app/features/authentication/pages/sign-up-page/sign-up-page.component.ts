import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { matchValidator } from 'src/app/core/validators/match-validator';
import { ResponseModel } from 'src/app/shared/models/response-model';
import { AuthenticationApiService } from '../../services/authentication-api.service';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss'],
})
export class SignUpPageComponent implements OnInit {
  signUpForm: FormGroup;
  isSubmitLoading: boolean = false;

  constructor(
    private _authenticationApiService: AuthenticationApiService,
    private _router: Router
  ) {
    this.signUpForm = new FormGroup({
      fullName: new FormControl('', [
        Validators.required,
        Validators.pattern(new RegExp('^[a-zA-Z]{2,}(?: [a-zA-Z]+){0,}$')),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        matchValidator('retypePassword', true),
      ]),
      retypePassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        matchValidator('password'),
      ]),
    });
  }

  ngOnInit(): void {}

  onClearClick(control: string) {
    this.signUpForm.patchValue({ [control]: '' });
  }

  onGoBackClick = (event: Event) => {
    // because event is coming from an <a> tag with href property,
    // the page will reload if not preventDefault()
    event.preventDefault();
    this._router.navigateByUrl('/auth/login');
  };

  checkFieldValidity = (control: string) => {
    return this.signUpForm.controls[control].invalid;
  };

  getFieldInvalidMessage = (control: string) => {
    if (control == 'fullName') {
      if (this.signUpForm.controls['fullName'].hasError('required')) {
        return 'You must enter your name';
      }
      if (this.signUpForm.controls['fullName'].hasError('pattern')) {
        return 'Not a valid name';
      }
    }

    if (control == 'email') {
      if (this.signUpForm.controls['email'].hasError('required')) {
        return 'You must enter your email';
      }
      if (this.signUpForm.controls['email'].hasError('email')) {
        return 'Not a valid email';
      }
    }

    if (control == 'password') {
      if (this.signUpForm.controls['password'].hasError('required')) {
        return 'You must enter your password';
      }
      if (this.signUpForm.controls['password'].hasError('minlength')) {
        return 'Password is too short';
      }
      if (this.signUpForm.controls['password'].hasError('matching')) {
        return "Passwords don't match";
      }
    }

    if (control == 'retypePassword') {
      if (this.signUpForm.controls['retypePassword'].hasError('required')) {
        return 'You must re-enter your password';
      }
      if (this.signUpForm.controls['retypePassword'].hasError('minlength')) {
        return 'Password is too short';
      }
      if (this.signUpForm.controls['retypePassword'].hasError('matching')) {
        return "Passwords don't match";
      }
    }

    return '';
  };

  onSignUpSubmit = () => {
    if (!this.signUpForm.invalid) {
      this.isSubmitLoading = true;
      this.signUp(
        this.signUpForm.value['fullName'],
        this.signUpForm.value['email'],
        this.signUpForm.value['password']
      );
    }
  };

  signUp = async (fullName: string, email: string, password: string) => {
    const response: ResponseModel = await this._authenticationApiService.signUp(
      email,
      password
    );
    this.handleSignUp(response);
  };

  handleSignUp = (response: ResponseModel) => {
    if (response.success) {
      this._router.navigateByUrl('');
    } else {
      alert(response.message);
    }
    this.isSubmitLoading = false;
  };
}
