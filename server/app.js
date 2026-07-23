const express = require("express");   //Importer la bibliotheque Express
const { connectDB } = require("./config/db.js");
const app = express();    //Cree serveur
const authRoutes = require("./routes/authRoutes.js");    // authRoutes pas besoin d'accolades car on recupere directement l'objet exporte
const taskRoutes = require("./routes/taskRoutes.js");
const cors = require("cors");

app.use(cors({
    origin: 'http://localhost:5173'
}));

app.use(express.json());

app.use("/api", authRoutes);
app.use("/api", taskRoutes);

connectDB();

app.get("/", (req, res) => {     //req: contient infos de client et res: permet d'envoyer une reponse
    res.send("Hello");          
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {             //Demarrer le serveur
    console.log(`Server running in port ${PORT}`);
});