import { Link } from "react-router-dom";

function Register() {
    return (
        <div>
            <h1>Inscription</h1>
            <p>
                vous avez un compte ?
                <Link to="/login">
                    Se connecter
                </Link>
            </p>
        </div>
    );
}

export default Register;