import { NavLink } from "react-router-dom";
import "./header.css";
export default function Header() {
    return (
        <>
            <div className={"sidebar"}>
                <NavLink to={"/"} className={"logo"}>
                    <img src="../../../public/logo.png" alt="Logo Dronem"></img>
                </NavLink>


                <div className={"presentation-text"}>
                    Votre fournisseur de drones de livraison de nem préféré à petit prix !
                </div>
                <nav>
                    <ul className={"nav-links"}>
                        <li>
                            <NavLink to={"/"} className={"nav-link"}>Accueil</NavLink>
                        </li>
                        <li>
                            <NavLink to={"/listProducts"} className={"nav-link"}>Liste des drones</NavLink>
                        </li>
                        <li>
                            <NavLink to={"/contact"} className={"nav-link"}>Contact</NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
}
