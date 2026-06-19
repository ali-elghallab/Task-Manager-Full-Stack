const { createUser, findUserByEmail } = require("../models/userModel");
const register = async(req, res) => {
    const {name, email, password } = req.body;
    const existingUser = await findUserByEmail(email);
    if(existingUser) {
        return res.status(400).json({
            message:"Email deja utilise"
        });
    }

    await createUser(name, email, password);

//Code HTTP :201 Created signifie :Une ressource a ete creee
    res.status(201).json({
        message:"Utilisateur cree"
    });
};

const login = async(req, res) => {
    const {email, password} = req.body;
    const user = await findUserByEmail(email);
    if(!user) {
        return res.status(400).json({
            message:"Utilisateur introuvable"
        });
    }

    if(user.password !== password) {
        return res.status(400).json({
            message:"Mot de passe incorrect"
        });
    }

    res.status(200).json({
        message:"Connexion reussie"
    });
};

module.exports = {register, login};