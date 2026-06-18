const sql = require("mssql");      //Importer la bibliotheque mssql
const config = {
    user: "sa",
    password: "Alios2123.",
    server: "localhost",
    port: 1433,
    database: "Task Manager",
    options: {
        encrypt: false,
        trustServerCertificate: true
    },
};

const connectDB = async() => {
    try {
        await sql.connect(config);
        console.log("SQL Server connected");
    } catch(err) {
        console.log("Erreur connexion SQL Server", err);
    }
};

module.exports = {connectDB, sql};