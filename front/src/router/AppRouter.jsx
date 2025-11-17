import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home.jsx";
import DroneList from "../pages/DroneList/DroneList.jsx"
import Connexion from "../pages/Connexion/Connexion.jsx";
import DronePage from "../pages/DronePage/DronePage.jsx"

export default function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/listProducts" element={<DroneList />} />
            <Route path="/connexion" element={<Connexion />} />
            <Route path="/products" element={<DronePage/>} />
        </Routes>
    );
}
