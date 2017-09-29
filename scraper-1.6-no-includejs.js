// import the webserver module, and create a server
// https://benjaminbenben.com/2013/07/28/phantomjs-webserver/
var server = require('webserver').create();
var port = require('system').env.PORT || 8080; // default back to 8080
console.log('Start server at port ' +port);

// start a server on port 8080 and register a request listener
server.listen(port, function(request, response) {
  console.log('Request received at ' + new Date());
	// response.write(request.method);
	// response.write(JSON.stringify(request.post));

  // var page = new WebPage();
  var page = require('webpage').create();
  var url = request.post.url;
  console.log('Url to scraping: ' +url);
  // var data = "";

  if(request.method == 'POST' && url) {
    console.log('Start scraping url ' +url);
    page.open(url, function(status) {
      if (status === "success") {
        // page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js", function() {
          var data = page.evaluate(function(){

            var section = $("h2:contains('lista ofert')" )[0].parentNode.parentNode;
            var adsList = section.getElementsByTagName('article');
            var numberOfAds = section.getElementsByTagName('article').length;
            var json = [];

            for (var i = 0; i < adsList.length; i++) {
              json.push({
                title:  adsList[i].getElementsByTagName('h2')[0].textContent,
                url:    adsList[i].getElementsByTagName('a')[0].href,
                price:  ''
              });
            }

            return json;
          });

          // Rather than console logging, write the data back as a
          // response to the user
          //
          console.log('Finded items: ' +data.length);

          response.statusCode = 400;
          response.write(JSON.stringify(data));
          response.close();

          // We want to keep phantom open for more requests, so
          // instead of exiting - we close the webpage and we're
          // ready for more requests.
          //
          // phantom.exit();

          page.close();
        // });
      } else {
        console.log("Page open " +status);
        response.statusCode = 400;
        response.write(JSON.stringify({'http status' : 400}));
        response.close();
      }
    });
  } else {
    console.log('No POST parameters');
    response.statusCode = 400;
    response.write(JSON.stringify({'http status': 400, 'message': 'No POST parameters'}));
    response.close();
  }

});
