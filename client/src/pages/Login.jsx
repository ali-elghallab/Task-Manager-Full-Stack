import { Link } from "react-router-dom";
import Register from "./Register";

function Login() {
    return (
        <div>
            <h1>Connexion</h1>
            <p>
                vous n'avez pas de compte ?
                <Link to="/register">
                    Créer un compte
                </Link>
            </p>
        </div>
    );
}

export default Login;