var fs = require('fs');
var path = require('path');

var ajv = require('ajv')();
var express = require('express');
var proxy = require('express-http-proxy');
var app = express();


var config = require('./config.json');
var public = path.resolve(__dirname + '/public/');

// Return index.html for all routes
for (var url in config.routes) {
  app.get(url, function (req, res) {
    res.sendFile(public + '/index.html');
  });
};

app.listen(config.port, function() {
  console.log('Http server started on ', config.port);
});

/*
  Put your code here -----------------------------------
*/
/*
// Proxy to :8000
var prURL = 'localhost:8000/api';
app.use('/api', proxy(prURL, {
  forwardPath: function(req, res) {
    console.log('proxy to ' + prURL);
    return require('url').parse(req.url).path;
  }
}));
*/

var request = require('request');
var newurl = 'http://localhost:8000/api';

app.use('/api', function(req,res) {
  console.log('proxy to ' + newurl);
  req.pipe(request(newurl)).pipe(res);
});


//var bodyParser = require('body-parser');
//app.use( bodyParser.json() ); 
//app.use( bodyParser.urlencoded());



// Static folders
app.use(express.static(public));

