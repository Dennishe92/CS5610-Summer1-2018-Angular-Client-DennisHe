import { Component, OnInit } from '@angular/core';
import {Route, Router} from '@angular/router';
import {UserServiceClient} from '../services/user.service.client';

@Component({
  selector: 'app-login-page',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private router: Router,
              private service: UserServiceClient) { }

  username;
  password;
  login(username, password) {
    console.log([username, password]);
    this.service
      .login(username, password)
      .then((response) => {
        if (response.status === 404) {
          alert('Incorrect login information.');
        } else if (username === 'admin' && password === 'admin') {
          this.router.navigate(['admin']);
        } else {
          this.router.navigate(['profile']);
        }
      });
  }

  ngOnInit() {
  }

}
