import "./dronePage.css";
import { useEffect, useState } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { addToCart } from "../../services/api";
import { useAuth } from "../../context/AuthContext";

export default function DronePage() {
    const { id } = useParams();
    const [drone, setDrone] = useState(null);

    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:8080/api/drones/getDroneById/${id}`)
            .then((res) => res.json())
            .then((data) => setDrone(data))
            .catch((err) => console.error(err));
    }, [id]);

    if (!drone) return <p>Chargement du drone...</p>;

    // 🔥 Fonction d’ajout au panier
    const handleAddToCart = async () => {
        if (!user) {
            navigate("/connexion");
            return;
        }

        try {
            await addToCart(user.id, drone.id, 1);
            alert("Ajouté au panier !");
        } catch (err) {
            console.error(err);
            alert("Erreur lors de l'ajout au panier");
        }
    };

    return (
        <main className="content-product">
            <div className="product-header">
                <h1>{drone.name}</h1>

                <NavLink to="/listProducts" className="btn-retour">
                    ← Retour
                </NavLink>
            </div>

            <div className="content-row">

                <div className="product-text">
                    <div className="product-info">
                        <p><span>Modèle :</span> {drone.model}</p>
                        <p><span>Catégorie :</span> {drone.category}</p>
                        <p><span>Batterie :</span> {drone.battery}</p>
                        <p><span>Vitesse :</span> {drone.speed} km/h</p>
                        <p><span>Prix :</span> {drone.price} CFP</p>
                    </div>

                    <label id="description-label">Description :</label>
                    <p id="description">{drone.description}</p>

                    <br />
                    <button className="btn-panier" onClick={handleAddToCart}>
                        Ajouter au panier
                    </button>
                </div>

                <div className="product-image">
                    <img
                        src={`http://localhost:8080/public/${drone.image_path}`}
                        alt={drone.name}
                    />
                </div>
            </div>
        </main>
    );
}
