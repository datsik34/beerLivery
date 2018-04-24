const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const stripe = require('stripe')('sk_test_uazSXLD1OuOgwsSwf6r93K8S');
var dataCardBeer = [];


// I N I T   B A S E   D E  D O N N E E S
var options = { server: { socketOptions: {connectTimeoutMS: 5000 } }};
mongoose.connect('mongodb://beerliveryUser:azerty@ds255329.mlab.com:55329/beerlivery',
    options,
    function(err) {
     console.log(err);
    }
);
var beerSchema = mongoose.Schema({
  name: String,
  type: String,
  image: String,
  price: Number
});
var beerModel = mongoose.model('databeers', beerSchema);
// F I N   B D D



router.get('/', function(req, res, next) {
  beerModel.find(
    function(err, databeers){
      res.render('catalogue', {beerList: databeers});
    });
});

router.post('/add-card', function(req, res, next){
  if (req.body.quantity > 0 ){
    req.session.dataCardBeer.push(req.body);
  }
  beerModel.find(
    function(err, databeers){
      console.log(req.session.dataCardBeer);
      res.render('catalogue', {beerList: databeers});
    });
});

module.exports = router;
