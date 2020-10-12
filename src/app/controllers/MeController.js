const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../utli/mongoose');

class MeController {
  //[GET] /me/stored/courses
  storedCourses(req, res, next) {
    Promise.all([Course.find(), Course.countDocumentsDeleted()])
      .then(([courses, deletedCount]) => {
        courses = mutipleMongooseToObject(courses);
        res.render('me/stored-courses', {
          courses,
          deletedCount,
        });
      })
      .catch(() => {});
  }

  // [GET] /me/trash/courses
  trashCourses(req, res, next) {
    Course.findDeleted({})
      .then(courses => {
        courses = mutipleMongooseToObject(courses);
        res.render('me/trash-courses', {
          courses,
        });
      })
      .catch(next);
  }
}

module.exports = new MeController();
