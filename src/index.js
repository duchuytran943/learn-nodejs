const path = require("path");
const express = require("express");
const morgan = require("morgan");
const handlebars = require("express-handlebars");

const app = express();
const port = 1234;

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

app.get("/", (req, res) => {
  return res.render("home");
});

app.get("/news", (req, res) => {
  return res.render("news");
});

app.get("/search", (req, res) => {
  return res.render("search");
});

app.listen(port, () => {
  console.log(`run add port ${port}`);
});
