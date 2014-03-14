exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.indexs = function(req, res){
  res.render('index-single-file', { title: 'Express' });
};