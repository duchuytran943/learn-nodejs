const Course = require("../models/Course");
const { mongooseToObject } = require("../../utli/mongoose");

class CourseController {
  //[GET] /courses/:slug
  show(req, res, next) {
    const slug = req.params.slug;
    Course.findOne({ slug })
      .then((course) => {
        course = mongooseToObject(course);
        res.render("courses/courseDetail", {
          course,
        });
      })
      .catch(next);
  }
}

module.exports = new CourseController();
