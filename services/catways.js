const Catway = require('../models/catway');

//ajout d'un catway
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

//recuperer la list de tout les catways
exports.ListCatways = async(req, res, next) =>{
    try {
        let catways = await Catway.find(); //j'ai du louper le passage du cours qui explique comment return tout les elements d'une collection, j'ai utiliser https://www.w3schools.com/mongodb/mongodb_mongosh_find.php pour trouver la fonction

        return res.status(200).json(catways);
    } catch (error) {
       return res.status(501).json(error);
    }
}

//recupere un catway en particulier via son numéro
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

//modifie un catway
exports.update = async (req, res, next) => {
    const id= req.params.id;

    const temp = {
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

//supprime un catway
exports.delete = async (req, res, next) => {
    const id= req.params.id;

    try {
        await Catway.deleteOne({catwayNumber: id});
        return res.status(204).json('delete_ok');
    } catch (error) {
        return res.status(501).json(error);
    }
}