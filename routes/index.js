var express = require('express');
var router = express.Router({ mergeParams: true }); //ce parametere et autres infos pour les sous ressources trouvé principalement ici: https://listentoripley.medium.com/express-js-routing-with-nested-paths-2526bae9d2e6

const userRoute = require('../routes/users');
const catwayRoute = require('../routes/catways')
const reservationRoute = require('../routes/reservations')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/users', userRoute);
router.use('/catways',catwayRoute);
router.use('/catways/:id',reservationRoute);


module.exports = router;
