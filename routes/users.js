var express = require('express');
var router = express.Router();

const service = require('../services/users');

const privater = require('../middlewares/private');

//route pour lire infos utilisateur
router.get('/:email',privater.checkJWT, service.getByEmail)

//route pour lister l'ensembles des utilisateurs
router.get('/',privater.checkJWT, service.ListUsers)

//route pour ajouter un utilisateur
router.post('/',service.add)

//route pour modifier un utilisateur
router.put('/:email',privater.checkJWT, service.update)

//route pour supprimer un utilisateur
router.delete('/:email',privater.checkJWT, service.delete)

//route pour connecter un utilisateur
router.post('/login', service.login)


module.exports = router;
