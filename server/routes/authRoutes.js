const express = require("express");
const router = express.Router();

const { register, login } = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);

module.exports = router;   //Pas besoin d'accolades car on exporte directement un seule variable