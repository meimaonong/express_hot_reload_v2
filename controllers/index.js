var express = require('express');
var router = express.Router();
var hbs = require('hbs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' }, function(err, html) {
    var template = hbs.compile('<h1>test{{title}}</h1>')({title: '中文标题'})
    res.send(template);
  });
});

module.exports = router;
