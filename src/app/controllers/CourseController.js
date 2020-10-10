const Course = require('../models/Course');
const { mongooseToObject } = require('../../utli/mongoose');

class CourseController {
  //[GET] /courses/:slug
  show(req, res, next) {
    const slug = req.params.slug;
    Course.findOne({
      slug,
    })
      .then(course => {
        course = mongooseToObject(course);
        res.render('courses/courseDetail', {
          course,
        });
      })
      .catch(next);
  }

  //[GET] /courses/create
  create(req, res, next) {
    res.render('courses/create');
  }

  // [GET] /courses/:id/edit
  edit(req, res, next) {
    Course.findById(req.params.id)
      .then(course => {
        course = mongooseToObject(course);
        res.render('courses/edit', {
          course,
        });
      })
      .catch(next);
  }

  // [PUT] /courses/:id
  update(req, res, next) {
    Course.updateOne(
      {
        _id: req.params.id,
      },
      req.body,
    )
      .then(res.redirect('/me/stored/courses/'))
      .catch(next);
  }

  // [PATCH] /courses/:id/restore
  restore(req, res, next) {
    Course.restore({
      _id: req.params.id,
    })
      .then(() => {
        res.redirect('back');
      })
      .catch(next);
  }

  // [DELETE] /courses/:id
  delete(req, res, next) {
    Course.delete({
      _id: req.params.id,
    })
      .then(res.redirect('back'))
      .catch(next);
  }

  // [DELETE] /courses/:id/force
  forceDelete(req, res, next) {
    Course.deleteOne({
      _id: req.params.id,
    })
      .then(res.redirect('back'))
      .catch(next);
  }

  //[POST] /courses/store
  store(req, res, next) {
    const formData = req.body;
    formData.image = `https://img.youtube.com/vi/${req.body.vId}/sddefault.jpg`;
    const course = new Course(formData);
    course
      .save()
      .then(res.redirect('/me/stored/courses'))
      .catch(error => {});
  }
}

module.exports = new CourseController();
