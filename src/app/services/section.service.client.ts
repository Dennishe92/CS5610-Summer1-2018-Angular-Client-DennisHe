export class SectionServiceClient {

  SECTION_URL = 'http://localhost:4000/api/course/COURSEID/section';

  findEnrollmentsForStudent() {
    return fetch('http://localhost:4000/api/student/section',
      {
        method: 'get',
        credentials: 'include'
      })
      .then(response => {
        if (response.status !== 404) {
          return response.json();
        }
      });
  }

  findSectionsForStudent() {
    const url = 'http://localhost:4000/api/student/section';
    return fetch(url, {
      credentials: 'include'
    })
      .then(response => response.json());
  }

  enrollStudentInSection(sectionId) {
    const url = 'http://localhost:4000/api/section/' + sectionId + '/enrollment';
    return fetch(url, {
      method: 'post',
      credentials: 'include'
    });
  }

  unEnrollStudentInSection(sectionId) {
    const url = 'http://localhost:4000/api/section/' + sectionId + '/enrollment';
    return fetch(url, {
      method: 'delete',
      credentials: 'include'
    });
  }

  findSectionsForCourse(courseId) {
    return fetch(this.SECTION_URL.replace('COURSEID', courseId))
      .then(response => response.json());
  }

  createSection(courseId, name, seats) {
    const section = {courseId, name, seats};
    return fetch(this.SECTION_URL.replace('COURSEID', courseId), {
      method: 'post',
      body: JSON.stringify(section),
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      }
    });
  }

  findSectionById(sectionId) {
    return fetch('http://localhost:4000/api/section/' + sectionId)
      .then(response => response.json());
  }

  deleteSection(sectionId) {
    return fetch('http://localhost:4000/api/section/' + sectionId + '/delete', {
      method: 'delete'
    })
      .then(response => response.json());
  }

  updateSection(sectionId, section) {
    return fetch('http://localhost:4000/api/section/' + sectionId, {
      method: 'put',
      body: JSON.stringify(section),
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => response.json());
  }
}
