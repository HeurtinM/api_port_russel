const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Catway = new Schema({
    catwayNumber: {
        type: Number,
        trim: true,
        required: [true, 'Le numéro est requis'],
        min: [0,"le numéro ne peut pas ètre inférieur a 0"],
        unique: true,
    },
    catwayType: {
        type: String, //j'ai penser mettre un Boolean ici mais après quelque recherche rapide il semblerait que string + enum soit la meilleur méthode
        enum: ['short', 'long'],
        required: [true, 'Le type est requis'], 
    },
    catwayState: {
        type: String,
    },
}, {

    timestamps: true
});

module.exports = mongoose.model('Catway', Catway);
