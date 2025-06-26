var express = require('express');
var router = express.Router();

const service = require('../services/users');
//route pour lire infos utilisateur
router.get('/users/:email',service.getByEmail)

//route pour lister l'ensembles des utilisateurs, pas dans le cours donc vide pour le moment
router.get('/users')

//route pour ajouter un utilisateur
router.post('/users',service.add)

//route pour modifier un utilisateur
router.put('users/:email',service.update)

//route pour supprimer un utilisateur
router.delete('users/:email',service.delete)


module.exports = router;
