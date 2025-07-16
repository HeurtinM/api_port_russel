var express = require('express');
var router = express.Router();

const service = require('../services/users');

//route pour lire infos utilisateur
router.get('/:email',service.getByEmail)

//route pour lister l'ensembles des utilisateurs
router.get('/',service.ListUsers)

//route pour ajouter un utilisateur
router.post('/',service.add)

//route pour modifier un utilisateur
router.put('/:email',service.update)

//route pour supprimer un utilisateur
router.delete('/:email',service.delete)

//route pour connecter un utilisateur
router.post('/login',service.login)


module.exports = router;
