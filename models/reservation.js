const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Reservation = new Schema({
    catwayNumber: {
        type: Number,
        required: [true, 'Le numéro est requis'],
        min: [0,"le numéro ne peut pas ètre inférieur a 0"],
    },
    clientName: {
        type: String,
        trim: true,
    },
    boatName: {
        type: String,
        trim: true,
    },
    startDate: {
        type: Date,
        required: [true, 'La date est requise'],
    },
    endDate: {
        type: Date,
        required: [true, 'La date est requise'],
    }
}, {

    timestamps: true
});

module.exports = mongoose.model('Catway', Catway);
