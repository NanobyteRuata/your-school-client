import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  userData;

  constructor(private angularFireAuth: AngularFireAuth) {
    this.userData = angularFireAuth.authState;
  }

  signUp(email: string, password: string) {
    this.angularFireAuth
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        console.log('success sign up:', response);
      })
      .catch((error) => {
        console.log('error:', error.message);
      });
  }

  signIn(email: string, password: string) {
    this.angularFireAuth
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        console.log('You are in!');
      })
      .catch((error) => {
        console.log('error:', error.message);
      });
  }

  signOut() {
    this.angularFireAuth.signOut();
  }
}
