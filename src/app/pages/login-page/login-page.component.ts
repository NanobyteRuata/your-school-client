import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit(): void {}

  signUp() {
    this.authenticationService.signUp(
      'lord.lionheart99@gmail.com',
      'Rockerski11$'
    );
  }
  signIn() {
    this.authenticationService.signIn(
      'lord.lionheart99@gmail.com',
      'Rockerski11$'
    );
  }
  signOut() {
    this.authenticationService.signOut();
  }
}
