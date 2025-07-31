var express = require('express');
var router = express.Router();

const service = require('../services/users');

const private = require('../middlewares/private');

//route pour lire infos utilisateur
router.get('/:email',private.checkJWT, service.getByEmail)

//route pour lister l'ensembles des utilisateurs
router.get('/',private.checkJWT, service.ListUsers)

//route pour ajouter un utilisateur
router.post('/',service.add)

//route pour modifier un utilisateur
router.put('/:email',private.checkJWT, service.update)

//route pour supprimer un utilisateur
router.delete('/:email',private.checkJWT, service.delete)

//route pour connecter un utilisateur
router.post('/login', service.login)


module.exports = router;
