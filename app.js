var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var ejs = require('ejs');
var favicon = require('static-favicon');
var compression = require('compression');
var logger = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var errorHandler = require('errorhandler');

var app = express();

app.disable('x-powered-by');
//app.disable('etag'); //this fixes ios safari bug at the expense of performance. Commented because iOS bug does not seem to surface on single file version of application.

// all environments
app.set('port', process.env.PORT || 3002);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(compression()); //gzip compression for HTTP responses
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser());
app.use(methodOverride());

// development only
if ('development' === app.get('env')) {
  app.use(errorHandler());
}

app.get('/', routes.index);
app.get('/indexs', routes.indexs);
app.get('/search', routes.index);
app.get('/bookmarks', routes.index);
app.get('/advertisers', routes.index);
app.get('/accountactivationpanel', routes.index);
app.get('/purchasepanel', routes.index);
app.get('/deletefavoritegroupconfirmationdialog', routes.index);

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});

//function noCache(req, res, next) {
////  res.header('Cache-Control', 'no-cache');
//  res.header('Cache-Control', 'public, max-age=0');
////  res.header('Expires', '-1');
////  res.header('Pragma', 'no-cache');
//  next();
//}
