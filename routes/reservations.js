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
router.put('/:idReservation',service.update) //je suis un peu confus ici. la route donner par le brief ne donne pas d'ID autre que le catways number mais plusieurs reservations doivent pouvoir utiliser le meme catway. Je me permet donc de modifier la route donner par le brief

//route pour supprimer une reservation
router.delete('/:idReservation',service.delete)

module.exports = router;