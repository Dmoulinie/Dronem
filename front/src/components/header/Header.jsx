import { NavLink } from "react-router-dom";
import "./header.css";
export default function Header() {
    return (
        <>
            <div className={"sidebar"}>
                <div className={"logo"}>
                    Logo
                </div>
                <div>
                    Votre fournisseur de drones de livraison de nem préféré à petit prix
                </div>
                <nav>
                    <ul>
                        <li>
                            <NavLink to={"/"}>Accueil</NavLink>
                        </li>
                        <li>
                            <NavLink to={"/listProducts"}>Liste des drones</NavLink>
                        </li>
                        <li>
                            <NavLink to={"/contact"}>Contact</NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
}
