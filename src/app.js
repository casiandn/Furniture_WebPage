const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload');
//env
require('dotenv').config()
// html and port
app.engine('html', require('ejs').renderFile);
app.set("port", process.env.PORT || 3000)
app.set('views', './front/views');
app.set('view engine', 'html');
//files
app.use(express.static('front'))
//Here we are configuring express to use body-parser as middle-ware.
app.use(
  fileUpload({
      limits: {
          fileSize: 5000000,
      },
      abortOnLimit: true,
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// routers
const mainRouter = require("./routes/main-router");
const invalidRoute = require("./routes/invalidRoute");

app.use(mainRouter);
app.use(invalidRoute);

module.exports = app;