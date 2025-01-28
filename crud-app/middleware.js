const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const middleware = express();

middleware.use(express.static(path.join(__dirname, 'public')));
middleware.use(bodyParser.json());
middleware.use(express.urlencoded({ extended: true }));

middleware.engine('handlebars', exphbs.engine({
  helpers: {
    formatDate: function (date) {
      const d = new Date(date);
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      const year = d.getFullYear();
      return `${year}-${month}-${day}`;
    }
  }
}));

middleware.set('view engine', 'handlebars');
middleware.set('views', './views');

module.exports = middleware;
