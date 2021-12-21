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
}
