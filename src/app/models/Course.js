const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const Course = new Schema(
  {
    _id: { type: Number },
    name: {
      type: String,
      maxlength: 255,
      required: true,
    },
    description: {
      type: String,
      maxlength: 600,
    },
    image: {
      type: String,
      maxlength: 255,
    },
    vId: {
      type: String,
      maxlength: 255,
      required: true,
    },
    level: {
      type: String,
      maxlength: 255,
    },
    // createdAt: { type: Date, default: Date.now },
    // updatedAt: { type: Date, default: Date.now },
    slug: {
      type: String,
      slug: 'name',
      unique: true,
    },
  },
  {
    _id: false, // Khi dùng cái này thì mongodb sẽ không đụng chạm đến trường _id nữa.
    timestamps: true,
  },
);

// Add plugins
mongoose.plugin(slug);

Course.plugin(AutoIncrement);
Course.plugin(mongooseDelete, { overrideMethods: 'all', deletedAt: true }); // Add soft delete for only Course Schema.

module.exports = mongoose.model('Course', Course);
