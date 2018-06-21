import { Component, OnInit } from '@angular/core';
import {User} from '../models/user.model.client';
import {UserServiceClient} from '../services/user.service.client';
import {Router} from '@angular/router';
import {SectionServiceClient} from '../services/section.service.client';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private service: UserServiceClient,
              private sectionService: SectionServiceClient,
              private router: Router) { }

  user = {};
  username;
  password;
  firstName;
  lastName;
  phone;
  email;
  address;
  enrollments = [];

  logout() {
    this.service
      .logout()
      .then(() =>
        this.router.navigate(['login']));
  }

  update(username, firstName, lastName, email) {
    const user = {
      username: username,
      firstName: firstName,
      lastName: lastName,
      email: email}
    this.service.update(user);
  }

  unEnrollment(enrollment) {
    this.sectionService
      .unEnrollStudentInSection(enrollment.section._id)
      .then(() => {
        this.sectionService.findEnrollmentsForStudent()
          .then(enrollments => this.enrollments = enrollments);
      });
  }

  loadEnrollments() {
    this.sectionService.findEnrollmentsForStudent()
      .then(enrollments => this.enrollments = enrollments);
  }

  ngOnInit() {
    this.service
      .profile()
      .then(((user) => {
        if (user === undefined) {
          this.router.navigate(['login']);
        }
        this.username = user.username;
        this.password = user.password;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.phone = user.phone;
        this.email = user.email;
        this.address = user.address;
      }));
    this.loadEnrollments();
  }
}
