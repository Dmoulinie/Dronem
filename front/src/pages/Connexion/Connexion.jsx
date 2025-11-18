import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import "../../assets/styles/style.css";
import "./connexion.css";

const API_BASE_URL = "http://localhost:8080/api"; 

export default function Connexion() {
    const [mode, setMode] = useState("login"); // "login" ou "register"
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        const data = new FormData(e.target);


        try {
            let endpoint = "";
            let payload = {};

            if (mode === "login") {
                endpoint = "/users/login";
                payload = {
                    username: data.get("username"),
                    password: data.get("password"),
                };
            } else {
                endpoint = "/users/register";
                payload = {
                    name: data.get("name"),
                    firstname: data.get("firstname"),
                    username: data.get("username"),
                    email: data.get("email"),
                    password: data.get("password"),
                };
            }

            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const json = await response.json();

            if (!response.ok) {
                setError(json.error || "Une erreur est survenue");
            } else {
                // on stocke le user + token dans le contexte (et localStorage)
                login(json.user, json.token);

                // redirection où tu veux (ex: page d'accueil ou page compte)
                navigate("/");
            }
        } catch (err) {
            console.error(err);
            setError("Erreur réseau ou serveur");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="auth-header">
                <h1 className="auth-title">Bienvenue sur votre espace Dronem</h1>
                <small className="auth-subtitle">
                    Gérez votre compte, suivez vos commandes et profitez de nos services en toute simplicité.
                </small>
            </div>

            <div className="auth-page">
                
                {/* Switch login / register */}
                <div className="auth-switch-container">
                    <div className="auth-switch">
                        <label className={mode === "login" ? "active" : ""}>
                            <input
                                type="radio"
                                name="mode"
                                value="login"
                                checked={mode === "login"}
                                onChange={() => setMode("login")}
                            />
                            Se connecter
                        </label>

                        <label className={mode === "register" ? "active" : ""}>
                            <input
                                type="radio"
                                name="mode"
                                value="register"
                                checked={mode === "register"}
                                onChange={() => setMode("register")}
                            />
                            S'inscrire
                        </label>
                    </div>
                </div>

                <div className="auth-card">
                    <form onSubmit={handleSubmit}>
                        {/* Ces champs apparaissent UNIQUEMENT en mode register */}
                        {mode === "register" && (
                            <>
                                <label className="auth-label" htmlFor="firstname">
                                    Prénom :
                                </label>
                                <input
                                    id="firstname"
                                    name="firstname"
                                    type="text"
                                    className="auth-input"
                                    placeholder="Votre prénom"
                                    required
                                />

                                <label className="auth-label" htmlFor="name">
                                    Nom :
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    className="auth-input"
                                    placeholder="Votre nom"
                                    required
                                />
                            </>
                        )}

                        {/* username : présent dans les deux modes */}
                        <label className="auth-label" htmlFor="username">
                            Nom d'utilisateur :
                        </label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            className="auth-input"
                            placeholder="Nom d'utilisateur ou email"
                            required
                        />

                        {/* email seulement en register */}
                        {mode === "register" && (
                            <>
                                <label className="auth-label" htmlFor="email">
                                    Email :
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    className="auth-input"
                                    placeholder="Votre email"
                                    required
                                />
                            </>
                        )}

                        {/* password : présent dans les deux modes */}
                        <label className="auth-label" htmlFor="password">
                            Mot de passe :
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            className="auth-input"
                            placeholder="Mot de passe"
                            required
                        />

                        {/* Affichage erreur éventuelle */}
                        {error && (
                            <p style={{ color: "red", marginBottom: "10px" }}>
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            className="auth-button"
                            disabled={loading}
                        >
                            {loading
                                ? "Veuillez patienter..."
                                : mode === "login"
                                ? "Se connecter"
                                : "Créer mon compte"}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
