var express = require('express');
var app = express();

var http       = require('http');
var join       = require('path').join;
var bodyParser = require('body-parser');

app.use(bodyParser.json());

const port = Number(process.env.PORT || 2994);

/* 
This means that everything in the folder public
will get served up. So you can just stick whatever
you want in public, and then go to 
localhost:2994/whatever and it will be there.
*/
app.use(express.static(join(__dirname, '/public')));

/*
When they go to localhost:2994/, they go to
the index.html page
*/
app.get('/', function(req, res, next) {
  const indexPage = join(__dirname, 'public/index.html')
  return (res.status(200).sendFile(indexPage));
});

const httpSever = http.createServer(app)
httpSever.listen(port, function(){
  console.log("Your website is available at localhost: " + port)
});