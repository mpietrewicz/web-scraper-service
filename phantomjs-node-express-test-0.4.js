var phantom = require('phantom');
const express = require('express');
const app = express();
var port = process.env.PORT || 8080;

var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer(); // for parsing multipart/form-data

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


app.post('/scraper', upload.array(), function (req, res, next) {
  console.log("Got a POST request for the homepage");
  console.log(req.body);
  url = req.body.url;
  // res.json(req.body);

  phantom.create().then(function(ph) {
    ph.createPage().then(function(page) {
      page.open(url).then(function(status) {
        console.log(status);
        page.property('content').then(function(content) {
          res.send(content);
          page.close();
          ph.exit();
        });
      });
    });
  });
})

app.listen(port, function () {
  console.log('Example app listening on port '+port+'!');
})
