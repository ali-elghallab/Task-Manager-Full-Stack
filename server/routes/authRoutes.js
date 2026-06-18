const express = require("express");
const router = express.Router();

const { register } = require("../controllers/authController");

router.post("/register", register);

module.exports = router;   //Pas besoin d'accolades car on exporte directement un seule variable