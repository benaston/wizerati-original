var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var ejs = require('ejs');

var app = express();

app.disable('x-powered-by');
//app.disable('etag');

// all environments
app.set('port', process.env.PORT || 3002);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.compress()); //gzip compression for HTTP responses
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

//ejs.open = '{{';
//ejs.close = '}}';

app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

app.get('/indexs', noCache, routes.indexs);
app.get('/search', routes.index);
app.get('/advertisers', routes.index);
app.get('/accountactivationpanel', routes.index);
app.get('/purchasepanel', routes.index);
app.get('/deletefavoritegroupconfirmationdialog', routes.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

function noCache(req, res, next) {
  res.header('Cache-Control', 'no-cache');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
}
