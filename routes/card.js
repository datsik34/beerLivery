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
    req.session.totalArticles = 0;
    for (i = 0; i < req.session.dataCardBeer.length; i++) {
      req.session.totalArticles += parseInt(req.session.dataCardBeer[i].quantity);
    };
    res.render('card', {
      cardbeer: req.session.dataCardBeer,
      optionsData: req.session.optionsData,
      articles: req.session.totalArticles
    });
  }
});

router.get('/delete-card', function(req, res, next) {
  req.session.dataCardBeer.splice(req.query.position, 1);
  req.session.totalArticles = 0;
  for (i = 0; i < req.session.dataCardBeer.length; i++) {
    req.session.totalArticles += parseInt(req.session.dataCardBeer[i].quantity);
  };
  res.render('card', {
    cardbeer: req.session.dataCardBeer,
    optionsData: req.session.optionsData,
    articles: req.session.totalArticles
  });
});

//************* G E S T I O N   Q U A N T I T E  B I E R E S ************//
router.get('/beer-decrease', function(req, res, next) {
  if (req.session.dataCardBeer[req.query.position].quantity <= 1) {
    res.render('card', {
      cardbeer: req.session.dataCardBeer,
      optionsData: req.session.optionsData,
      articles: req.session.totalArticles
    });
  } else {
    req.session.dataCardBeer[req.query.position].quantity--;
    req.session.totalArticles = 0;
    for (i = 0; i < req.session.dataCardBeer.length; i++) {
      req.session.totalArticles += parseInt(req.session.dataCardBeer[i].quantity);
    };
    res.render('card', {
      cardbeer: req.session.dataCardBeer,
      optionsData: req.session.optionsData,
      articles: req.session.totalArticles
    });
  }
});

router.get('/beer-increase', function(req, res, next) {
  req.session.dataCardBeer[req.query.position].quantity++;
  req.session.totalArticles = 0;
  for (i = 0; i < req.session.dataCardBeer.length; i++) {
    req.session.totalArticles += parseInt(req.session.dataCardBeer[i].quantity);
  };
  res.render('card', {
    cardbeer: req.session.dataCardBeer,
    optionsData: req.session.optionsData,
    articles: req.session.totalArticles
  });
});

//************* G E S T I O N   Q U A N T I T E   D E C A P S ************//
router.get('/options-dec-decrease', function(req, res, next) {
  if (req.session.optionsData.decapsuleur.quantity <= 0) {
    res.render('card', {
      cardbeer: req.session.dataCardBeer,
      optionsData: req.session.optionsData,
      articles: req.session.totalArticles
    });
  } else {
    req.session.optionsData.decapsuleur.quantity--;
    res.render('card', {
      cardbeer: req.session.dataCardBeer,
      optionsData: req.session.optionsData,
      articles: req.session.totalArticles
    });
  }
});

router.get('/options-dec-increase', function(req, res, next) {
  req.session.optionsData.decapsuleur.quantity++;
  res.render('card', {
    cardbeer: req.session.dataCardBeer,
    optionsData: req.session.optionsData,
    articles: req.session.totalArticles
  });
});

//************* G E S T I O N   Q U A N T I T E   O P T I O N S ************//
router.get('/options-decrease', function(req, res, next) {
  if (req.session.optionsData.supplements[req.query.position].quantity <= 0) {
    res.render('card', {
      cardbeer: req.session.dataCardBeer,
      optionsData: req.session.optionsData,
      articles: req.session.totalArticles
    });
  } else {
    req.session.optionsData.supplements[req.query.position].quantity--;
    res.render('card', {
      cardbeer: req.session.dataCardBeer,
      optionsData: req.session.optionsData,
      articles: req.session.totalArticles
    });
  }
});

router.get('/options-increase', function(req, res, next) {
  req.session.optionsData.supplements[req.query.position].quantity++;
  res.render('card', {
    cardbeer: req.session.dataCardBeer,
    optionsData: req.session.optionsData,
    articles: req.session.totalArticles
  });
});

router.post('/checkout', function(req, res) {
  var totalCmd = 0;
  var totalBeers = 0;
  var totalDecapsuleur = 0;
  var totalSupplements = 0;
  for (let i = 0; i < req.session.dataCardBeer.length; i++) {
    totalBeers += parseInt(req.session.dataCardBeer[i].price) * parseInt(req.session.dataCardBeer[i].quantity);
  }
  if (req.session.optionsData.supplements.length > 0 || req.session.optionsData.decapsuleur.quantity > 0) {
    if (req.session.optionsData.supplements.length > 0 && req.session.optionsData.decapsuleur.quantity > 0) {
      for (let i = 0; i < req.session.optionsData.supplements.length; i++) {
        totalSupplements += parseInt(req.session.optionsData.supplements[i].quantity) * parseInt(req.session.optionsData.supplements[i].price);
      }
      totalDecapsuleur = parseInt(req.session.optionsData.decapsuleur.quantity) * parseInt(req.session.optionsData.decapsuleur.price);
      totalCmd += (totalBeers + totalSupplements + totalDecapsuleur + 1.5) * 100;
    } else if (req.session.optionsData.supplements.length > 0) {
      for (let i = 0; i < req.session.optionsData.supplements.length; i++) {
        totalSupplements += parseInt(req.session.optionsData.supplements[i].quantity) * parseInt(req.session.optionsData.supplements[i].price);
      }
      totalCmd += (totalBeers + totalSupplements + 1.5) * 100;
    }
  } else {
    totalCmd += (totalBeers + 1.5) * 100;
  }

  stripe.customers.create({email: req.body.stripeEmail, source: req.body.stripeToken}).then(customer => stripe.charges.create({amount: totalCmd, description: "Commande beerLivery", currency: "eur", customer: customer.id})).then(charge => {
    req.session.dataCardBeer = [];
    res.render('confirm')
  });
});

module.exports = router;
