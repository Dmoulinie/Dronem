import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home.jsx";
import DroneList from "../pages/DroneList/DroneList.jsx"
import Connexion from "../pages/Connexion/Connexion.jsx";

export default function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/listProducts" element={<DroneList />} />
            <Route path="/connexion" element={<Connexion />} />
            
        </Routes>
    );
}
