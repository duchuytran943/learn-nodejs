module.exports = {
  multipleMongooseToObject: (mongooses) =>
    mongooses.map((mongoose) => mongoose.toObject()),

  mongooseToObject: (mongoose) => mongoose.toObject(),
};
