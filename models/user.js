const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt');

const User = new Schema({
    userName: {
        type: String,
        trim: true,
        required: [true, 'Le nom est requis']
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'L\'email est requis'],
        unique: true, 
        lowercase: true
    },
    password: {
        type: String,

        required: [true, 'Le mot de passe est requis'],
        maxLength: 30,
        //verifie que le mdp ne contient pas d'espace. validate et validator trouver dans la doc mongoose https://mongoosejs.com/docs/validation.html et "/\s/g" sur stack overflow
        validate:{
            validator: function hasWhiteSpace(s) {
            return !/\s/g.test(s);
            },
            message: props => `${props.value} le mot de passe ne doit pas contenir d'espace`
        },
    },
}, {

    timestamps: true
});


User.pre('save', function(next) {
    if (!this.isModified('password')) {
        return next();
    }

    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

module.exports = mongoose.model('User', User);
