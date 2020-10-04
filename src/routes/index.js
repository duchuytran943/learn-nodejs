const newsRouter = require("./news");
const siteRouter = require("./site");

function route(app) {
  app.use("/news", newsRouter);

  app.use("/", siteRouter);

  //   app.get("/", (req, res) => {
  //     return res.render("home");
  //   });

  //   app.get("/search", (req, res) => {
  //     return res.render("search");
  //   });

  //   app.post("/search", (req, res) => {
  //     console.log(req.body);
  //     return res.send("");
  //   });
}

module.exports = route;
