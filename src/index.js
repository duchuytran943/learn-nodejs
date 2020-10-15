const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const methodOverride = require('method-override');

const SortMiddleware = require('./app/middlewares/SortMiddleware');

const app = express();
const port = 1234;

const route = require('./routes');
const db = require('./config/db');

//Connect to DB
db.connect();

app.use(
  express.urlencoded({
    extended: true,
  }),
); //parse form data from body
app.use(express.json()); //parse data from JS

//Set public static file
app.use(express.static(path.join(__dirname, 'public')));

//HTTP logger
app.use(morgan('combined'));

//Override method (PUT, PATCH,....)
app.use(methodOverride('_method'));

//Custom middlewares
app.use(SortMiddleware);

//Template engine
app.engine(
  'hbs',
  handlebars({
    extname: '.hbs', //change file extention .handlebars => .hbs
    // create functions helpers for handlebar. Use these functions at file views (.hbs).
    helpers: {
      sum: (a, b) => a + b,
      sortable: (field, sort) => {
        const sortType = field === sort.column ? sort.type : 'default';

        const icons = {
          default: `oi oi-elevator`,
          asc: `oi oi-sort-ascending`,
          desc: `oi oi-sort-descending`,
        };

        const types = {
          default: 'desc',
          asc: 'desc',
          desc: 'asc',
        };

        const icon = icons[sortType];
        const type = types[sortType];
        return `<a href="?_sort&column=${field}&type=${type}"><span class="${icon}"></span></a>`;
      },
    },
  }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

//Routes init
route(app);

app.listen(port, () => {
  console.log(`App run at port ${port}`);
});
