var express = require('express');
var router = express.Router({ mergeParams: true });

const service = require('../services/reservations');


//route pour ajouter un catway
router.post('/reservations',service.add)

module.exports = router;