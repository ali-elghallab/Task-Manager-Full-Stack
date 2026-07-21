const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    
    console.log("Headers :", req.headers);
    console.log("Authorization :", req.headers.authorization);
    
    const authHeader = req.headers.authorization;

    if(!authHeader) {
        return res.status(401).json({
            message: "Token manquant"
        });
    }

    const token = authHeader.split(" ")[1];

    /*jwt.verify() fait trois choses: 
    --> vérifie que le token n'a pas été modifié
    --> vérifie qu'il n'est pas expiré
    --> récupère les informations qu'il contient.*/

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch(err){
        console.log(err);
        return res.status(401).json({
            message: err.message
        });
    }
};

module.exports = authMiddleware;

/*Client
   │
   ▼
GET /tasks
   │
   ▼
authMiddleware
   │
   ├── Token absent
   │      ▼
   │   401 Unauthorized
   │
   └── Token valide
          ▼
      getUserTasks
          ▼
      SQL Server
          ▼
      Liste des tâches*/