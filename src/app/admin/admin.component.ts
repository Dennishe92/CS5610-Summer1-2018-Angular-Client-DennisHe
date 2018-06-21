import { Component, OnInit } from '@angular/core';
import {CourseServiceClient} from '../services/course.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {UserServiceClient} from '../services/user.service.client';
import {SectionServiceClient} from '../services/section.service.client';
import {Section} from '../models/section.model.client';


@Component({
  selector: 'app-admin-page',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private courseService: CourseServiceClient,
              private userService: UserServiceClient,
              private sectionService: SectionServiceClient,
              private router: Router,
              private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.setParams(params));
  }

  courses = [];
  courseId = '';
  sectionName = '';
  seats = '';
  sections = [];
  section: Section = new Section();
  sectionId = '';
  setParams(params) {
    this.loadCourses();
    this.loadSections(params['courseId']);
  }

  loadCourses() {
    this.courseService.findAllCourses()
      .then(courses => this.courses = courses);
  }

  loadSections(courseId) {
    this.courseId = courseId;
    this.sectionService.findSectionsForCourse(courseId)
      .then(sections => this.sections = sections);
  }

  createSection(sectionName, seats) {
    this.sectionService.createSection(this.courseId, sectionName, seats)
      .then(() => {
        this.loadSections(this.courseId);
      });
  }

  selectCourse(courseId) {
    this.courseId = courseId;
    this.loadSections(courseId);
  }

  deleteSection(sectionId) {
    this.sectionService.deleteSection(sectionId)
      .then(() => this.loadSections(this.courseId));
    this.section = new Section();
  }


  updateSection(sectionId, name, seats) {
    this.sectionService.updateSection(sectionId, {
      courseId: this.courseId,
      name: name,
      seats: seats
    }).then(() => this.loadSections(this.courseId));
  }

  ngOnInit() {
  }

}
