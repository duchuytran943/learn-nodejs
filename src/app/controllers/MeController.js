const Course = require("../models/Course");
const { mutipleMongooseToObject } = require("../../utli/mongoose");

class MeController {
  //[GET] /me/stored/courses
  storedCourses(req, res, next) {
    Course.find({})
      .then((courses) => {
        courses = mutipleMongooseToObject(courses);
        res.render("me/stored-courses", {
          courses,
        });
      })
      .catch(next);
  }
}

module.exports = new MeController();
