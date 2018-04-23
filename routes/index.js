const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const cardsData = [
    {
      img: "/images/icecubes.svg",
      tag: "Fraicheur",
      data: "Une bière fraiche, c'est pas une meilleure bière ? C'est pourquoi lors de la livraison, votre bière sera toujours à bonne température, pour votre plus grand bonheur."
    }, {
      img: "/images/medal.svg",
      tag: "Qualité",
      data: "Nous avons sélectionné pour vous le meilleur de la bière du marché."
    }, {
      img: "/images/stopwatch.svg",
      tag: "Rapidité",
      data: "Quoi de mieux qu'un client content ? Nous estimons que vous ne devez pas trop attendre, pour cette raison, nous nous engageons à vous livrer dans les plus brefs délais."
    }
  ];
  res.render('index', {cardsData});
});

router.get('/catalogue', function(req, res, next) {
  res.render('catalogue');
});

router.post('/search-address', function(req, res) {
  if (!req.body.address) {
    res.redirect('/')
  } else {
    res.redirect('catalogue');
  }
});

module.exports = router;
