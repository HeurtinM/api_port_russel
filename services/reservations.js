const Reservation = require('../models/reservation');
const Catway = require('../models/catway'); //import pour verifier que l'id est celle d'un catway existent


//ajout d'une reservatiion
exports.add = async (req, res, next) =>{
    const id = req.params.id;

    let catway = await Catway.findOne({catwayNumber: id})

    //vérifie que le catways existe 
    if (!catway) {
        return res.status(404).json({ error: "ce numéro de catway n'est pas attribué" });
    }

    const temp = {
        catwayNumber: id,
        clientName: req.body.clientName,
        boatName: req.body.boatName,
        startDate: new Date(req.body.startDate), //constructeur Date trouver sur stackOverflow puis appris ici: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date
        endDate: new Date(req.body.endDate),
    };

    //simple verification des dates. Je pense avoir utiliser le bon numéro d'érreur
    if(temp.endDate< temp.startDate){
        return res.status(400).json({ error: "La date de début de la réservation doit être avant la date de fin de la réservation." }); 
    }

     try {
            let reservation = await Reservation.create(temp);
            return res.status(201).json(Reservation);
        } catch (error) {
            return res.status(501).json(error);
        }
}



