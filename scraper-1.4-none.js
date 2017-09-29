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
  var url = "https://allegro.pl/kategoria/opony-samochodowe-letnie-99202?string=RE002%20205%2F55%2FR15&order=m&bmatch=base-relevance-floki-5-nga-hc-aut-1-1-0901";
  var data = "";

  page.open(url, function(status) {
    console.log('Start scraping url ' +url);
    if (status === "success") {
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

        response.statusCode = 200;
        response.write(JSON.stringify(data));
        response.close();

        // We want to keep phantom open for more requests, so
        // instead of exiting - we close the webpage and we're
        // ready for more requests.
        //
        // phantom.exit();

        page.close();

    } else {
      console.log("HTTP status " +status);
      phantom.exit(1);
    }
  });
});
