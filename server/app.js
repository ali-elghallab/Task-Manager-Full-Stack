const express = require("express");   //Importer la bibliotheque Express
const { connectDB } = require("./config/db.js");
const app = express();    //Cree serveur
const authRoutes = require("./routes/authRoutes.js");    // authRoutes pas besoin d'accolades car on recupere directement l'objet exporte
const taskRoutes = require("./routes/taskRoutes.js");

app.use("/api", authRoutes);
app.use("/api", taskRoutes);
app.use(express.json());

connectDB();

app.get("/", (req, res) => {     //req: contient infos de client et res: permet d'envoyer une reponse
    res.send("Hello");          
});
app.listen(5000, () => {             //Demarrer le serveur
    console.log("Server running in port 5000");
});