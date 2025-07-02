var express = require('express');
var router = express.Router();

const service = require('../services/catways');

//route pour lire infos catway
router.get('/:id',service.getByNumber)

//route pour lister l'ensembles des catways, pas dans le cours donc vide pour le moment
router.get('/',service.ListCatways)

//route pour ajouter un catway
router.post('/',service.add)

//route pour modifier un catway
router.put('/:id',service.update)

//route pour supprimer un catway
router.delete('/:id',service.delete)


module.exports = router;
