const Reservation = require('../models/reservation');
const Catway = require('../models/catway'); //import pour verifier que l'id est celle d'un catway existent
const reservation = require('../models/reservation');


//ajout d'une reservation
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


    //verifie si la nouvelle reservation ne chevauche pas une déjà existente    
    const reservations = await Reservation.find({catwayNumber: id}) //fonction .toArray trouver sur StackOverflow

    for(let i = 0; i < (reservations.length);i++){
        const existingReservation = reservations[i];
        
        if (
            (temp.startDate >= existingReservation.startDate && temp.startDate <= existingReservation.endDate) ||
            (temp.endDate >= existingReservation.startDate && temp.endDate <= existingReservation.endDate) ||
            (temp.startDate <= existingReservation.startDate && temp.endDate >= existingReservation.endDate)
        ){
         return res.status(400).json({ error: "cette date est déjà reservée" }); 
        }
    }

    try {
        let reservation = await Reservation.create(temp);
            return res.status(201).json(Reservation);
        } catch (error) {
            return res.status(501).json(error);
        }
}

//list toute les reservations
exports.ListReservation = async(req, res, next) =>{
    try {
        let reservation = await Reservation.find(); 

        return res.status(200).json(reservation);
    } catch (error) {
       return res.status(501).json(error);
    }

    //je ne suis pas sûr de ce qui est demandé par le brief ici. faut til lister toute les reservations ou toute les reservations de ce catways specifiquement ?
    //dans le doute voici comment je modifirai le code pour accomplir la seconde option:

    // try {
    //     const id = req.params.id;
    //     let reservation = await Reservation.find({ catwayNumber: id }); 

    //     return res.status(200).json(reservation);
    // } catch (error) {
    //    return res.status(501).json(error);
    // }
}

//recuperer une reservation via son id
exports.getById = async (req, res, next) => {
    const id= req.params.idReservation;

    try {
        let reservation = await Reservation.findById(id); //ici on récupère en utilisant l'ID mongoDB de la réservation car j'imagine qu'il doit ètre possible d'avoir plusieurs réservations pour le meme catways. Si il fallait utiliser le catwayNumber j'ai donner le code qui ferait ça en commentaire dans listReservations

        if (reservation) {
            return res.status(200).json(reservation);
        }

        return res.status(404).json('catway_not_found');
    } catch (error) {
        return res.status(501).json(error);
    }
};

//modifie une reservation
exports.update = async (req, res, next) => {
    const id= req.params.idReservation;

    const temp = {
        clientName: req.body.clientName,
        boatName: req.body.boatName,
        startDate: new Date(req.body.startDate),
        endDate: new Date(req.body.endDate),
    };

    try {
        let reservation = await Reservation.findById(id); //je suis un peu confus ici. la route donner par le brief ne donne pas d'ID autre que le catways number mais plusieurs reservations doivent pouvoir

        if (reservation) {
            Object.keys(temp).forEach((key) => {
                if (!!temp[key]) {
                    reservation[key] = temp[key];
                }
            });

            await reservation.save();
            return res.status(201).json(reservation);
        }

        return res.status(404).json('reservation_not_found');
    } catch (error) {
        return res.status(501).json(error);
    }
};

exports.delete = async (req, res, next) => {
    const id= req.params.idReservation;

    try {
        await Reservation.findByIdAndDelete(id); //pareille que pour en recuperer une j'utilise l'id mongoDB
        return res.status(204).json('delete_ok');
    } catch (error) {
        return res.status(501).json(error);
    }
}