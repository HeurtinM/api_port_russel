var express = require('express');
var router = express.Router();

const service = require('../services/users');

//route pour lire infos utilisateur
router.get('/:email',service.getByEmail)

//route pour lister l'ensembles des utilisateurs, pas dans le cours donc vide pour le moment
router.get('/',service.ListUsers)

//route pour ajouter un utilisateur
router.post('/',service.add)

//route pour modifier un utilisateur
router.put('/:email',service.update)

//route pour supprimer un utilisateur
router.delete('/:email',service.delete)


module.exports = router;
