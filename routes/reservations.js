var express = require('express');
var router = express.Router({ mergeParams: true });

const service = require('../services/reservations');


//route pour ajouter un catway
router.post('/',service.add)

//route pour list toutes les 
router.get('/', service.ListReservation)

//route pour récuperer une reservations via son ID
router.get('/:idReservation',service.getById)

//route pour modifier une reservation
router.put('/',service.update)

//route pour supprimer une reservation
router.delete('/:idReservation',service.delete)

module.exports = router;