import { NavLink } from "react-router-dom";
import "./header.css";
import emptyCart from "../../assets/empty-cart.png";
import cartWithItems from "../../assets/cart-with-items.png";
import userIcon from "../../assets/user-icon.png";
import Panier from "../panier/panier.jsx";
import { useState } from "react";

export default function Header() {

    const [panierOpen, setPanierOpen] = useState(false);

    const togglePanier = () => {
        setPanierOpen(prev => !prev);
    };

    const isCartEmpty = true; // géré plus tard

    return (
        <>
            {/* ----- SIDEBAR ----- */}
            <div className="sidebar">

                {/* TOP - Logo */}
                <div className="sidebar-top">
                    <NavLink to="/" className="logo">
                        <img src="/logo.png" alt="Logo Dronem" />
                    </NavLink>
                </div>

                {/* MIDDLE */}
                <div className="sidebar-middle">
                    <h2 className="presentation-text">
                        Votre fournisseur de drones de livraison de nem préféré à petit prix !
                    </h2>

                    <nav>
                        <ul className="nav-links">
                            <li><NavLink to="/" className="nav-link">Accueil</NavLink></li>
                            <li><NavLink to="/listProducts" className="nav-link">Liste des drones</NavLink></li>
                            <li><NavLink to="/contact" className="nav-link">Contact</NavLink></li>
                        </ul>
                    </nav>
                </div>

                {/* BOTTOM */}
                <div className="sidebar-bottom userAndCart">

                    <NavLink to="/connexion" className="user-link">
                        <img src={userIcon} className="user-icon" alt="User profile" />
                    </NavLink>

                    {/* ---- Icône Panier ---- */}
                    <img
                        src={isCartEmpty ? emptyCart : cartWithItems}
                        className="cart"
                        alt="Cart"
                        onClick={togglePanier}
                    />

                </div>
            </div>

            {/* ----- PANIER DÉFILANT ----- */}
            <Panier open={panierOpen} onClose={() => setPanierOpen(false)} />
        </>
    );
}
