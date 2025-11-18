import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home.jsx";
import Panier from "../components/panier/Panier.jsx";
import DroneList from "../pages/DroneList/DroneList.jsx"
import Connexion from "../pages/Connexion/Connexion.jsx";
import DronePage from "../pages/DronePage/DronePage.jsx"
import ContactPage from "../pages/Contact/Contact.jsx";

export default function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/listProducts" element={<DroneList />} />
            <Route path="/product/:id" element={<DronePage />} />
            <Route path="/panier" element={<Panier />} />
            <Route path="/connexion" element={<Connexion />} />
            <Route path="/products" element={<DronePage />} />
            <Route path="/contact" element={<ContactPage />} />
        </Routes>
    );
}
