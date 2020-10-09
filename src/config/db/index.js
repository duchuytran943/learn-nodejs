const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect("mongodb://localhost:27017/education_dev", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    // useFindAndModify: false,
    // useCreateIndex: true,
    console.log("Connect database successfuly!!!");
  } catch (error) {
    console.log(error);
  }
}

module.exports = { connect };
