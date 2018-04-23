const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const cardsData = [
    {
      title: "Fraicheur",
      data: "Une bière fraiche, c'est pas une meilleure bière ? C'est pourquoi lors de la livraison, votre bière sera toujours à bonne température, pour votre plus grand bonheur."
    }, {
      title: "Qualité",
      data: "Nous avons sélectionné pour vous le meilleur de la bière du marché."
    }, {
      title: "Rapidité",
      data: "Quoi de mieux qu'un client content ? Nous estimons que vous ne devez pas trop attendre, pour cette raison, nous nous engageons à vous livrer dans les plus brefs délais."
    }
  ];
  res.render('index', {cardsData});
});

router.get('/catalogue', function(req, res, next) {
  res.render('catalogue');
});

router.get('/card', function(req, res, next) {
  res.render('card');
});

router.post('/search-address', function(req, res) {
  res.redirect('catalogue');
});

module.exports = router;
