import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserServiceClient} from '../services/user.service.client';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router,
              private service: UserServiceClient) { }

  username;
  password;
  password2;
  register(username, password, password2) {
    if (password !== password2) {
      alert('Please make sure your password matches');
    } else {
      this.service
        .createUser(username, password)
        .then((response) => {
          if (response.status === 409) {
            alert('Username already exist. Please choose another one.');
          } else {
            this.router.navigate(['profile']);
          }
        });
    }
  }

  ngOnInit() {
  }

}
