const express = require("express");
const morgan = require("morgan");

const app = express();
const port = 3000;

app.use(morgan("combined"));

app.get("/", (req, res) => {
  return res.send("Hello Duc Huy!!!");
});

app.listen(port, () => {
  console.log(`run add port ${port}`);
});
