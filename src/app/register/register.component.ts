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
  user;
  register(username, password, password2) {
    // this.service.findUserByUsername(username)
    //   .then(user => this.user = user);

    if (password !== password2) {
      alert('Please make sure your password matches');
      this.router.navigate (['/register']);
    } else {
      this.service
        .createUser(username, password)
        .then(() =>
          this.router.navigate(['profile']));
    }
  }

  ngOnInit() {
  }

}
