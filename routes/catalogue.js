const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const stripe = require('stripe')('sk_test_uazSXLD1OuOgwsSwf6r93K8S');


//CONNECTION  DB
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

router.get('/', function(req, res, next) {
  console.log("kikou");
  beerModel.find(
    function(err, databeers){
      console.log(err);
      console.log(databeers);
      res.render('catalogue', {beerList: databeers});
    });
});

module.exports = router;
