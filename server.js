var http = require('http');
var fs = require('fs');
var url = require('url');
var port = 8080;
//var listings = [];

/* Global variables */
var listingData = {};


fs.readFile('listings.json', 'utf8', function(err, data) {
  /*
    This callback function should save the data in the listingData variable,
    then start the server.
   */

   if(err != null) {
     console.log(err);
   }

   else {
     listingData = JSON.parse(data);

   }

});

var requestHandler = function(request, response) {

  var parsedUrl = url.parse(request.url);
  console.log("Server is Running");
  console.log(parsedUrl);
  console.log(request.method);

  if(request.method == 'GET' && parsedUrl.path == '/listings') { // && parsedUrl == '/listings'
    //go ahead and return data
    console.log(listingData);
    response.writeHead(200, {"Context-Type": "text/plain"});
    response.write(JSON.stringify(listingData));
    response.end();
  }

  else {
    response.writeHead(404, {"Context-Type": "text/plain"});
    response.write("Bad gateway error");
    response.end();
  }
  /*
    Your request handler should send listingData in the JSON format if a GET request
    is sent to the '/listings' path. Otherwise, it should send a 404 error.

    HINT: explore the request object and its properties
    http://stackoverflow.com/questions/17251553/nodejs-request-object-documentation
   */

  //  response.end('Request received!');
};

var server = http.createServer(requestHandler);

server.listen(port, function() {
  //once the server is listening, this callback function is executed
  console.log('Server listening on: http://127.0.0.1:' + port);
});
