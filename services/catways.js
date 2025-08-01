const Catway = require('../models/catway');

//
/**
 * ajout d'un catway
 *
 * @async
 * @function add
 * @param {Object} req objet demandé par la requete
 * @param {Object} req.body Le corps de la requete, contient les info du catway
 * @param {Object} res L'objet envoyé en réponse
 * @param {Function} next appel la fonction middleware suivante
 * @returns {Object} renvoie un JSON avec les infos du catway crée, en cas d'échec renvoie une érreur.
 */
exports.add = async (req, res, next) =>{

    const temp = {
        catwayNumber: req.body.catwayNumber,
        catwayType: req.body.catwayType,
       catwayState: req.body.catwayState,
    };

     try {
            let catway = await Catway.create(temp);
            return res.status(201).json(catway);
        } catch (error) {
            return res.status(501).json(error);
        }
}

//
/**
 * recuperer la list de tout les catways
 *
 * @async
 * @function exports
 * @param {Object} req objet demandé par la requete
 * @param {Object} res L'objet envoyé en réponse
 * @param {Function} next appel la fonction middleware suivante
 * @returns {Object} renvoie un JSON avec les infos des catways, en cas d'échec renvoie une érreur.
 */
exports.ListCatways = async(req, res, next) =>{
    try {
        let catways = await Catway.find(); // fonction trouvée sur https://www.w3schools.com/mongodb/mongodb_mongosh_find.php comme toute les autres fonction mongo hors du cour

        return res.status(200).json(catways);
    } catch (error) {
       return res.status(501).json(error);
    }
}

//
/**
 * recupere un catway en particulier via son numéro
 *
 * @async
 * @function exports
 * @param {Object} req objet demandé par la requete
 * @param {Object} id recupère l'id présent dans le corp de la requete 
 * @param {Object} res L'objet envoyé en réponse
 * @param {Function} next appel la fonction middleware suivante
 * @returns {Object} renvoie un JSON avec les infos du catway récuperer via son numéro, en cas d'échec renvoie une érreur.
 */
exports.getByNumber = async (req, res, next) => {
    const id= req.params.id;

    try {
        let catway = await Catway.findOne({catwayNumber: id});

        if (catway) {
            return res.status(200).json(catway);
        }

        return res.status(404).json('ce numéro de catway n\'est pas attribué');
    } catch (error) {
        return res.status(501).json(error);
    }
};

//
/**
 * modifie un catway
 *
 * @async
 * @function update
 * @param {Object} req objet demandé par la requete
 * @param {Object} req.body Le corps de la requete, contient le numéro du catway a modifier ainsie que les nouvelle valeurs à lui attribuer
 * @param {Object} id recupère l'id présent dans le corp de la requete 
 * @param {Object} res L'objet envoyé en réponse
 * @param {Function} next appel la fonction middleware suivante
 * @returns {Object} renvoie le JSON du catway récuperer via l'id avec les valeurs modifier en utilisant celle donnée dans le corp de la requete, en cas d'échec renvoie une érreur.
 */
exports.update = async (req, res, next) => {
    const id= req.params.id;

    const temp = {
        catwayType: req.body.catwayType,
        catwayState: req.body.catwayState
    };

    try {
        let catway = await Catway.findOne({catwayNumber: id});

        if (catway) {
            Object.keys(temp).forEach((key) => {
                if (!!temp[key]) {
                    catway[key] = temp[key];
                }
            });

            await catway.save();
            return res.status(201).json(catway);
        }

        return res.status(404).json('catway_not_found');
    } catch (error) {
        return res.status(501).json(error);
    }
};

//
/**
 * supprime un catway
 *
 * @async
 * @function delete
 * @param {Object} req objet demandé par la requete
 * @param {Object} id recupère l'id présent dans le corp de la requete 
 * @param {Object} res L'objet envoyé en réponse
 * @param {Function} next appel la fonction middleware suivante
 * @returns {Object} renvoie un status qui confirm la suppréssion du catway, en cas d'échec renvoie une érreur.
 */
exports.delete = async (req, res, next) => {
    const id= req.params.id;

    try {
        await Catway.deleteOne({catwayNumber: id});
        return res.status(204).json('delete_ok');
    } catch (error) {
        return res.status(501).json(error);
    }
}