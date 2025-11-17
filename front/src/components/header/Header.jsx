import { NavLink } from "react-router-dom";
import "./header.css";
import emptyCart from "../../assets/empty-cart.png";
import cartWithItems from "../../assets/cart-with-items.png";
import userIcon from "../../assets/user-icon.png";

export default function Header() {

    const isCartEmpty = true; // à remplacer plus tard par un vrai state

    return (
        <>
            <div className="sidebar">

                {/* TOP - Logo */}
                <div className="sidebar-top">
                    <NavLink to="/" className="logo">
                        <img src="/logo.png" alt="Logo Dronem" />
                    </NavLink>
                </div>

                {/* MIDDLE - Texte + Navigation */}
                <div className="sidebar-middle">

                    <h2 className="presentation-text">
                        Votre fournisseur de drones de livraison de nem préféré à petit prix !
                    </h2>

                    <nav>
                        <ul className="nav-links">
                            <li>
                                <NavLink to="/" className="nav-link">Accueil</NavLink>
                            </li>
                            <li>
                                <NavLink to="/listProducts" className="nav-link">Liste des drones</NavLink>
                            </li>
                            <li>
                                <NavLink to="/contact" className="nav-link">Contact</NavLink>
                            </li>
                        </ul>
                    </nav>

                </div>

                {/* BOTTOM - User + Cart */}
                <div className="sidebar-bottom userAndCart">

                    <img src={userIcon} className="user-icon" alt="User profile" />

                    {isCartEmpty ? (
                        <img src={emptyCart} className="cart" alt="Empty cart" />
                    ) : (
                        <img src={cartWithItems} className="cart" alt="Cart with items" />
                    )}

                </div>

            </div>
        </>
    );
}
