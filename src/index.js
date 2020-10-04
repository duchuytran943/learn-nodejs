const path = require("path");
const express = require("express");
const morgan = require("morgan");
const handlebars = require("express-handlebars");

const app = express();
const port = 1234;

const route = require("./routes");

app.use(express.urlencoded({ extended: true })); //parse form data from body
app.use(express.json()); //parse data from JS

//Set public static file
app.use(express.static(path.join(__dirname, "public")));

//HTTP logger
app.use(morgan("combined"));

//Template engine
app.engine(
  "hbs",
  handlebars({
    extname: ".hbs", //change file extention .handlebars => .hbs
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources/views"));

//Routes init
route(app);

app.listen(port, () => {
  console.log(`run add port ${port}`);
});
