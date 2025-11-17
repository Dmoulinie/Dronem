import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { loginUser, registerUser } from "../../services/api";
import "../../assets/styles/style.css";
import "./connexion.css";

export default function Connexion() {
    const [mode, setMode] = useState("login");
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
            let response;

            if (mode === "login") {
                response = await loginUser(
                    data.get("username"),
                    data.get("password")
                );
            } else {
                response = await registerUser({
                    name: data.get("name"),
                    firstname: data.get("firstname"),
                    username: data.get("username"),
                    email: data.get("email"),
                    password: data.get("password"),
                });
            }

            // 🔥 AuthContext : stocker user + token
            login(response.user, response.token);

            navigate("/");

        } catch (err) {
            setError(err.message || "Erreur inconnue");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
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

                    <label className="auth-label" htmlFor="username">
                        Nom d'utilisateur :
                    </label>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        className="auth-input"
                        placeholder="Nom d'utilisateur"
                        required
                    />

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

                    {error && (
                        <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>
                    )}

                    <button type="submit" className="auth-button" disabled={loading}>
                        {loading
                            ? "Veuillez patienter..."
                            : mode === "login"
                                ? "Se connecter"
                                : "Créer mon compte"}
                    </button>
                </form>
            </div>
        </div>
    );
}
