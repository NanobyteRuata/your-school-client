import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import firebase from 'firebase';

@Injectable()
export class AuthService {
  userData;

  constructor(private _angularFireAuth: AngularFireAuth) {
    this.userData = _angularFireAuth.authState;
  }

  // return true if there's user and false otherwise
  checkAuthentication = (): Observable<boolean> => {
    return this.getUser().pipe(map((user) => (user ? true : false)));
  };

  // get logged in firebase user in the browser
  getUser = (): Observable<firebase.User | null> => {
    return this._angularFireAuth.authState;
  };

  signOut() {
    this._angularFireAuth.signOut();
  }
}
