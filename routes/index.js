var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/catalogue', function(req, res, next){
  res.render('catalogue');
});

router.post('/search-address', function(req, res) {
  res.redirect('catalogue');
});

module.exports = router;
