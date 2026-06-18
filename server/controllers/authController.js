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

    res.status(201).json({
        message:"Utilisateur cree"
    });
};

module.exports = {register};