import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ResponseModel } from 'src/app/shared/models/response-model';

@Injectable()
export class AuthenticationApiService {
  constructor(private _angularFireAuth: AngularFireAuth) {}

  signUp = async (email: string, password: string): Promise<ResponseModel> => {
    try {
      const response =
        await this._angularFireAuth.createUserWithEmailAndPassword(
          email,
          password
        );
      return {
        success: true,
        data: response,
        message: 'Sign Up Success',
      };
    } catch (err: any) {
      return {
        success: false,
        message: err.message || 'Sign Up Failed',
      };
    }
  };

  signIn = async (email: string, password: string): Promise<ResponseModel> => {
    try {
      const response = await this._angularFireAuth.signInWithEmailAndPassword(
        email,
        password
      );
      return {
        success: true,
        data: response,
        message: 'Login Success',
      };
    } catch (err: any) {
      return {
        success: false,
        message: err.message || 'Login Failed',
      };
    }
  };

  forgotPassword = async (email: string): Promise<ResponseModel> => {
    try {
      const response = await this._angularFireAuth.sendPasswordResetEmail(
        email
      );
      return {
        success: true,
        data: response,
        message: `Email sent to ${email}`,
      };
    } catch (err: any) {
      return {
        success: false,
        message: err.message || 'Sending reset email failed',
      };
    }
  };

  verifyCode = async (code: string): Promise<ResponseModel> => {
    try {
      const response = await this._angularFireAuth.verifyPasswordResetCode(
        code
      );
      return {
        success: true,
        data: response,
        message: `Code is valid`,
      };
    } catch (err: any) {
      return {
        success: false,
        message: err.message || 'Invalid code',
      };
    }
  };

  resetPassword = async (
    code: string,
    newPassword: string
  ): Promise<ResponseModel> => {
    try {
      const response = await this._angularFireAuth.confirmPasswordReset(
        code,
        newPassword
      );
      return {
        success: true,
        data: response,
        message: `Password reset success`,
      };
    } catch (err: any) {
      return {
        success: false,
        message: err.message || 'Password reset failed',
      };
    }
  };
}
