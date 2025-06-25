const User = require('../models/user');

//recuperer utilisateur
exports.getById = async (req, res, next) => {
    const id = req.params.id;

    try {
        let user = await User.findById(id);

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
    const emailToCheck = req.body.email;

    //ma tentative de reparer le manque de verification des "user input" comme indiquer dans le cour, j'ai utilisé cette ressource: https://www.w3resource.com/javascript/form/email-validation.php
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailToCheck)) {
        return res.status(400).json({ error: 'format email invalide' });
    }

    const temp = {
        name: req.body.name,
        firstname: req.body.firstname,
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

//modifier utilisiateur
exports.update = async (req, res, next) => {
    const id = req.params.id;
    const temp = {
        name: req.body.name,
        firstname: req.body.firstname,
        email: req.body.email,
        password: req.body.password
    };

    try {
        let user = await User.findOne({ _id: id });

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

//supprimer utilisateur
exports.delete = async (req, res, next) => {
    const id = req.params.id;

    try {
        await User.deleteOne({ _id: id });
        return res.status(204).json('delete_ok');
    } catch (error) {
        return res.status(501).json(error);
    }
}