const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const stripe = require('stripe')('sk_test_uazSXLD1OuOgwsSwf6r93K8S');

var optionsData = [
  {
    name: "Cacahuètes",
    quantity: 0,
    price: 1
  }, {
    name: "Bretzels",
    quantity: 0,
    price: 1
  }, {
    name: "Chips",
    quantity: 0,
    price: 1
  }
];

router.get('/', function(req, res, next) {
  if (!req.session.dataCardBeer) {
    res.redirect('/');
  } else {
    res.render('card', {
      cardbeer: req.session.dataCardBeer,
      optionsData: optionsData
    });
  }
});

router.get('/delete-card', function(req, res){
  console.log(req.query.position);
  req.session.dataCardBeer.splice(req.query.position, 1);
  res.render('card', {cardbeer: req.session.dataCardBeer, optionsData: optionsData});
});

module.exports = router;
