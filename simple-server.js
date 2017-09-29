// import the webserver module, and create a server
// https://benjaminbenben.com/2013/07/28/phantomjs-webserver/
var server = require('webserver').create();
var port = require('system').env.PORT || 8080; // default back to 8080

// start a server on port 8080 and register a request listener
server.listen(port, function(request, response) {

	response.write(request.method);
	// response.write(JSON.stringify(request.post));

  var page = new WebPage();

  page.open("http://lanyrd.com/places/oxfordshire/", function(){
    var events = page.evaluate(function(){
      return $('.vevent .summary').map(function(e){
        return '* ' + this.innerText
      }).toArray().join('\n');
    });

    // Rather than console logging, write the data back as a
    // response to the user
    //
    // console.log('Upcoming Events in Oxfordshire:');
    // console.log(events);

    response.statusCode = 200;
    response.write('Upcoming Events in Oxfordshire:\n');
    response.write(events);
    response.close();

    // We want to keep phantom open for more requests, so
    // instead of exiting - we close the webpage and we're
    // ready for more requests.
    //
    // phantom.exit();

    page.close();

  });
});
