import { useNavigate } from "react-router-dom";
import "../../assets/styles/style.css";
import "./home.css";

export default function Home() {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate("/listProducts");
    };

    return (
        <div className="cards">
            <div className="card" onClick={handleCardClick}>
                <img src="../../../public/drones/Card1.png" alt="Drone 1" />
                <div className="card-text">Froid</div>
            </div>

            <div className="card" onClick={handleCardClick}>
                <img src="../../../public/drones/Card2.png" alt="Drone 2" />
                <div className="card-text">Chaud</div>
            </div>

            <div className="card" onClick={handleCardClick}>
                <img src="../../../public/drones/Card3.png" alt="Drone 3" />
                <div className="card-text">Boisson</div>
            </div>
        </div>
    );
}
