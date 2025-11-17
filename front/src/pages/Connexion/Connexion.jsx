import { NavLink } from "react-router-dom";
import { useState } from "react"; 
import "../../assets/styles/style.css";
import "./connexion.css";

export default function Connexion() {

    const [mode, setMode] = useState("login"); // "login" ou "register"

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);

        console.log("Mode :", mode);
        console.log("username :", data.get("username"));
        console.log("password :", data.get("password"));

        if (mode === "register") {
        console.log("firstname :", data.get("firstname"));
        console.log("name :", data.get("name"));
        console.log("email :", data.get("email"));
        }
    };

    return (
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
                        placeholder="Nom d'utilisateur"
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

                    <button type="submit" className="auth-button">
                        {mode === "login" ? "Se connecter" : "Créer mon compte"}
                    </button>
                </form>
            </div>
        </div>
    );
}