import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home.jsx";
import DroneList from "../pages/DroneList/DroneList.jsx"
import DronePage from "../pages/DronePage/DronePage.jsx"

export default function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/listProducts" element={<DroneList />} />
            <Route path="/products" element={<DronePage/>} />
        </Routes>
    );
}
