const Course = require("../models/Course");
const { multipleMongooseToObject } = require("../../utli/mongoose");

class SiteController {
  //[GET] /
  index(req, res, next) {
    // Course.find({}, function (err, courses) {
    //   if (!err) {
    //     res.json(courses);
    //     return;
    //   }
    //   // res.status(400).json({ error: "Error!!!" });
    //   next(err);
    // });

    Course.find({})
      .then((courses) => {
        // courses = courses.map((course) => course.toObject());
        return res.render("home", {
          courses: multipleMongooseToObject(courses),
        });
      })
      .catch(next); // catch(error => next(error))
  }

  //[GET] /search
  search(req, res) {
    res.render("search");
  }
}

module.exports = new SiteController();
