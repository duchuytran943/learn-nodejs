const path = require("path");
const express = require("express");
const morgan = require("morgan");
const handlebars = require("express-handlebars");

const app = express();
const port = 1234;

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

app.get("/", (req, res) => {
  return res.render("home");
});

app.get("/news", (req, res) => {
  return res.render("news");
});

app.get("/search", (req, res) => {
  return res.render("search");
});

app.post("/search", (req, res) => {
  console.log(req.body);
  return res.send("");
});

app.listen(port, () => {
  console.log(`run add port ${port}`);
});
