import { createContext } from "react";

const AuthContext = createContext();

export default AuthContext;

/*createContext() crée un contexte React.

Ce contexte servira à stocker :
    le token ;
    l'utilisateur ;
    les fonctions login();
    logout().

Il crée simplement un "espace mémoire partagé". */