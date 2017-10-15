var phantom = require('phantom');
const express = require('express')
const app = express()

app.post('/', function (req, res) {
  // res.send('Hello World!')
  console.log("Got a POST request for the homepage");
  // res.send('Hello POST');

  phantom.create().then(function(ph) {
    ph.createPage().then(function(page) {
      page.open('https://allegro.pl/kategoria/seria-3-e46-1998-2007-18077?order=m').then(function(status) {
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

app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
})
