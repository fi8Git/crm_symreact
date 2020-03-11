import React, { useState, useContext } from 'react';
import authAPI from '../services/authAPI';
import AuthContext from '../contexts/AuthContext';

const LoginPage = ({ history }) => {
    const { setIsAuthenticated } = useContext(AuthContext);

    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });

    const [error, setError] = useState("");

    //Gestion des champs
    const handleChange = ({ currentTarget }) => {
        const { value, name } = currentTarget;
        setCredentials({ ...credentials, [name]: value })
    }

    //Gestion du submit
    const handleSubmit = async event => {
        event.preventDefault();
        try {
            await authAPI.authentificate(credentials);
            setError("");
            setIsAuthenticated(true);
            history.replace("/Customers");
        } catch (error) {
            console.log(error.reponse);
            setError("Erreur d'authentification");
        }
        console.log(credentials);
    }


    return (
        <>
            <h1>Connexion</h1>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Adresse de connexion</label>
                    <input
                        value={credentials.username}
                        onChange={handleChange}
                        type="email"
                        placeholder="Entrer email..."
                        name="username"
                        id="username"
                        className={"form-control" + (error && " is-invalid")}
                    />
                    {error && <p className="invalid-feedback">{error}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Mot de passe</label>
                    <input
                        value={credentials.password}
                        onChange={handleChange}
                        type="password"
                        placeholder="Entrer mot de passe..."
                        name="password"
                        id="password"
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-success">connexion</button>
                </div>
            </form>
        </>
    );
}

export default LoginPage;