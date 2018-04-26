const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const stripe = require('stripe')('sk_test_uazSXLD1OuOgwsSwf6r93K8S');

// I N I T   B A S E   D E  D O N N E E S
var options = {
  server: {
    socketOptions: {
      connectTimeoutMS: 5000
    }
  }
};
mongoose.connect('mongodb://beerliveryUser:azerty@ds255329.mlab.com:55329/beerlivery', options, function(err) {
  console.log(err);
});
var beerSchema = mongoose.Schema({name: String, type: String, image: String, price: Number, quantity: Number});
var beerModel = mongoose.model('databeers', beerSchema);
// F I N   B D D

var totalArticles = 0;

router.get('/', function(req, res, next) {
  if (!req.session.dataCardBeer) {
    res.redirect('/');
  } else {
    totalArticles = 0;
    for (i = 0; i < req.session.dataCardBeer.length; i++) {
      totalArticles += parseInt(req.session.dataCardBeer[i].quantity);
    }
    beerModel.find(function(err, databeers) {
      res.render('catalogue', {
        beerList: databeers,
        beerCard: req.session.dataCardBeer,
        articles: totalArticles
      });
    });
  }
});

router.post('/', function(req, res, next) {
  if (req.body.quantity >= 0) {
    let exists = req.session.dataCardBeer.find(function(el) {
      return el.name === req.body.name;
    });
    if (!exists) {
      req.session.dataCardBeer.push(req.body);
    } else if (req.body.quantity == 0) {
      req.session.dataCardBeer.splice(req.body.name, 1);
    } else {
      exists.quantity = req.body.quantity;
    }
  }
  totalArticles = 0;
  for (i = 0; i < req.session.dataCardBeer.length; i++) {
    totalArticles += parseInt(req.session.dataCardBeer[i].quantity);
  }
  beerModel.find(function(err, databeers) {
    res.render('catalogue', {
      beerList: databeers,
      beerCard: req.session.dataCardBeer,
      articles: totalArticles
    });
  });
});

module.exports = router;
