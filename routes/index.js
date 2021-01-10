var express = require('express'); 
var router = express.Router();

const stripe = require('stripe')('sk_test_51HttrMJFMY6qwn96axtssbnzQxrxjX0farSX7OHoRMk1vKEpRfVFrfurGljAv5LYvphjzyuJzAYIkvt3nUBHu54H00hT5DtTpS');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Home Page'
  });
});

/* GET test page. */
router.get('/test', function(req, res, next) {
  res.send(req.header('X-API-Key'));
});

/* GET sucess page. */
router.get('/sucess', function(req, res, next) {
  res.send(req.header('X-API-Key'));
});

/* GET canceled page. */
router.get('/canceled', function(req, res, next) {
  res.send(req.header('X-API-Key'));
});

/* POST test page. */
router.post('/test', function(req, res, next) {
  res.send(req.body.name);
});

/* GET Payment page. */
router.get('/payment', (req, res, next) => {
  stripe.tokens.create({
    'card': {
      'number': '4242424242424242',
      'exp_month': 12,
      'exp_year': 2021,
      'cvc': '314',
    },
  })
  .then((token) => { 
      // To access to the token ID in the scope create, we have to asign the reference to an object
      var tokenObj = Object.assign({}, token);
      stripe.customers.create({
        'email': 'jenny.rosen@example.com',
        'source': tokenObj.id
      })
      .then((customer) => {
          // To access to the customer ID in the scope create, we have to asign the reference to an object
          var customerObj = Object.assign({}, customer);
          stripe.charges.create({
            'customer': customerObj.id,
            'amount': 2000,
            'description': 'Meuble Ikea',
            'currency': 'EUR'
          })
          .then((charge) => {
            console.log(charge)
            console.log("Success")
          })
        })
    }).catch((err) => {
      console.log(err)
    })
  })
module.exports = router;