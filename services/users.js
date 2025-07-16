const User = require('../models/user');
const bcrypt = require('bcrypt');

//recuperer la liste des utilisateurs
exports.ListUsers = async(req, res, next) =>{
    try {
        let users = await User.find(); //j'ai du louper le passage du cours qui explique comment return tout les elements d'une collection, j'ai utiliser https://www.w3schools.com/mongodb/mongodb_mongosh_find.php pour trouver la fonction

        return res.status(200).json(users);
    } catch (error) {
       return res.status(501).json(error);
    }
}

//recuperer utilisateur en utilisant l'email au lieu de l'id (comme le cours le fait) afin de correspondre a la route demander par le brief de mission
exports.getByEmail = async (req, res, next) => {
    const email = req.params.email;

    try {
        let user = await User.findOne({email: email});

        if (user) {
            return res.status(200).json(user);
        }

        return res.status(404).json('user_not_found');
    } catch (error) {
        return res.status(501).json(error);
    }
};

//ajouter utilisateur
exports.add = async (req, res, next) => {
    console.log("user add");
    const emailToCheck = req.body.email;

    //ma tentative de reparer le manque de verification des "user input" comme indiquer dans le cour, j'ai utilisé cette ressource: https://www.w3resource.com/javascript/form/email-validation.php
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailToCheck)) {
        return res.status(400).json({ error: 'format email invalide' });
    }

    const temp = {
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
    };

    try {
        let user = await User.create(temp);
        return res.status(201).json(user);
    } catch (error) {
        return res.status(501).json(error);
    }
};

//modifier utilisiateur, idem que pour recuperer, j'utilise l'email au lieu de l'id comme demande les routes du brief
exports.update = async (req, res, next) => {
    const email = req.params.email;
    const temp = {
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password
    };

    try {
        let user = await User.findOne({ email: email });

        if (user) {
            Object.keys(temp).forEach((key) => {
                if (!!temp[key]) {
                    user[key] = temp[key];
                }
            });

            await user.save();
            return res.status(201).json(user);
        }

        return res.status(404).json('user_not_found');
    } catch (error) {
        return res.status(501).json(error);
    }
};

//supprimer utilisateur, toujours pareille, email au lieu d'id
exports.delete = async (req, res, next) => {
    const email = req.params.email;

    try {
        await User.deleteOne({ email: email });
        return res.status(204).json('delete_ok');
    } catch (error) {
        return res.status(501).json(error);
    }
}

//fonction pour se connecter, crée via des recherches sur different forums, sites d'info et utilisation de "le chat Mistral"
exports.login = async (req, res, next) => {
    const {userName, email, password} = req.body;

    try{
        let user = await User.findOne({email: email});

        if(user && bcrypt.compareSync(password, user.password)){
            //fonction response redirect prise ici: https://expressjs.com/en/api.html#res.redirect
            res.redirect("/dashboard.html");
        }
        else{
            res.status(401).json({ success: false, message: "Email ou mot de passe incorrect" });
        }     
    } catch (error) {
        return res.status(501).json(error);
    }
}