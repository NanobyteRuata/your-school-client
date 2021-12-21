import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResponseModel } from 'src/app/shared/models/response-model';
import { AuthenticationApiService } from '../../services/authentication-api.service';

@Component({
  selector: 'app-forgot-password-page',
  templateUrl: './forgot-password-page.component.html',
  styleUrls: ['./forgot-password-page.component.scss'],
})
export class ForgotPasswordPageComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  isSubmitLoading: boolean = false;

  constructor(
    private _authenticationApiService: AuthenticationApiService,
    private _router: Router
  ) {
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  ngOnInit(): void {}

  onClearClick(control: string) {
    this.forgotPasswordForm.patchValue({ [control]: '' });
  }

  onGoBackClick = (event: Event) => {
    // because event is coming from an <a> tag with href property,
    // the page will reload if not preventDefault()
    event.preventDefault();
    this._router.navigateByUrl('/auth/login');
  };

  checkFieldValidity = (control: string) => {
    return this.forgotPasswordForm.controls[control].invalid;
  };

  getFieldInvalidMessage = (control: string) => {
    if (control == 'email') {
      if (this.forgotPasswordForm.controls['email'].hasError('required')) {
        return 'You must enter your email';
      }
      if (this.forgotPasswordForm.controls['email'].hasError('email')) {
        return 'Not a valid email';
      }
    }

    return '';
  };

  onForgotPasswordSubmit = () => {
    if (!this.forgotPasswordForm.invalid) {
      this.isSubmitLoading = true;
      this.forgotPassword(this.forgotPasswordForm.value['email']);
    }
  };

  forgotPassword = async (email: string) => {
    const response: ResponseModel =
      await this._authenticationApiService.forgotPassword(email);
    this.handleForgotPassword(response);
  };

  handleForgotPassword = (response: ResponseModel) => {
    if (response.success) {
      this._router.navigateByUrl('');
    } else {
      alert(response.message);
    }
    this.isSubmitLoading = false;
  };
}
