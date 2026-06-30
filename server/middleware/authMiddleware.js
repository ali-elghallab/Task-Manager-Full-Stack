const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    
    const authHeader = req.headers.authorization;

    if(!authHeader) {
        return resizeBy.status(401).json({
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
        return res.status(401).json({
            message: "Token invalide"
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