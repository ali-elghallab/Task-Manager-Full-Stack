import { useState } from "react";
import AuthContext from "./AuthContext";

function AuthProvider({ children }) {
    const [token, setToken] = useState(
        localStorage.getItem("token")
    );

    return (
        <AuthContext.Provider value={{ token, setToken }}>
            {children}
        </AuthContext.Provider>
    /*Toutes les données placées dans value seront accessibles depuis n'importe quel composant.*/
    );
}

/*AuthProvider est un composant que nous allons créer

Son rôle :
    mémoriser le token ;
    mémoriser l'utilisateur ;
    gérer login();
    gérer logout();
    fournir ces informations à toute l'application.*/

export default AuthProvider;