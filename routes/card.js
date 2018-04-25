const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const stripe = require('stripe')('sk_test_uazSXLD1OuOgwsSwf6r93K8S');

var optionsData = {
  supplements: [
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
  ],
  decapsuleur: {
    quantity: 0,
    price: 2
  }
};



router.get('/', function(req, res, next) {
  if (!req.session.dataCardBeer) {
    res.redirect('/');
  } else {
    req.session.optionsData = optionsData;
    res.render('card', {
      cardbeer: req.session.dataCardBeer,
      optionsData: req.session.optionsData
    });
  }
});

router.get('/delete-card', function(req, res){
  req.session.dataCardBeer.splice(req.query.position, 1);
  res.render('card', {cardbeer: req.session.dataCardBeer, optionsData: req.session.optionsData});
});


//************* G E S T I O N   Q U A N T I T E  B I E R E S ************//
router.get('/beer-decrease', function(req, res){
  if (req.session.dataCardBeer[req.query.position].quantity <= 1) {
    res.render('card', {cardbeer: req.session.dataCardBeer, optionsData: req.session.optionsData});
  } else {
    req.session.dataCardBeer[req.query.position].quantity--;
    res.render('card', {cardbeer: req.session.dataCardBeer, optionsData: req.session.optionsData});
  }
});

router.get('/beer-increase', function(req, res){
  req.session.dataCardBeer[req.query.position].quantity++;
  res.render('card', {cardbeer: req.session.dataCardBeer, optionsData: req.session.optionsData});
});











//************* G E S T I O N   Q U A N T I T E   D E C A P S ************//
router.get('/options-dec-decrease', function(req, res){
  if (req.session.optionsData.decapsuleur.quantity <= 0) {
    res.render('card', {cardbeer: req.session.dataCardBeer, optionsData: req.session.optionsData});
  } else {
    req.session.optionsData.decapsuleur.quantity--;
    res.render('card', {cardbeer: req.session.dataCardBeer, optionsData: req.session.optionsData});
  }
});

router.get('/options-dec-increase', function(req, res){
  req.session.optionsData.decapsuleur.quantity++;
  res.render('card', {cardbeer: req.session.dataCardBeer, optionsData: req.session.optionsData});
});
















//************* G E S T I O N   Q U A N T I T E   O P T I O N S ************//
router.get('/options-decrease', function(req, res){
  if (req.session.optionsData.supplements[req.query.position].quantity <= 0) {
    res.render('card', {cardbeer: req.session.dataCardBeer, optionsData: req.session.optionsData});
  } else {
    req.session.optionsData.supplements[req.query.position].quantity--;
    res.render('card', {cardbeer: req.session.dataCardBeer, optionsData: req.session.optionsData});
  }
});

router.get('/options-increase', function(req, res){
  req.session.optionsData.supplements[req.query.position].quantity++;
  res.render('card', {cardbeer: req.session.dataCardBeer, optionsData: req.session.optionsData});
});


module.exports = router;
