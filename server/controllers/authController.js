const { createUser, findUserByEmail } = require("../models/userModel");

//Importer JWT
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

const register = async(req, res) => {
    const {name, email, password } = req.body;
    const existingUser = await findUserByEmail(email);
    if(existingUser) {
        return res.status(400).json({
            message:"Email deja utilise"
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await createUser(name, email, hashedPassword);

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

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) {
        return res.status(400).json({
            message:"Mot de passe incorrect"
        });
    }

    const token = jwt.sign(
        {
            id: user.id,
            email: user.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d"    //Durrée de validité = 1 day
        }
    );
    res.status(200).json({
        token
    });
};

module.exports = {register, login};