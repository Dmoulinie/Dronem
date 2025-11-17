import { useNavigate } from "react-router-dom";
import "../../assets/styles/style.css";
import "./home.css";

export default function Home() {
    const navigate = useNavigate();

    const handleCardClick = (filter) => {
        navigate(`/listProducts?filter=${filter}`);
    };

    return (
        <div className="cards">
            <div className="card" onClick={() => handleCardClick("froid")}>
                <img src="../../../public/drones/Card1.png" alt="Drone 1" />
                <div className="card-text">Froid</div>
            </div>

            <div className="card" onClick={() => handleCardClick("chaud")}>
                <img src="../../../public/drones/Card2.png" alt="Drone 2" />
                <div className="card-text">Chaud</div>
            </div>

            <div className="card" onClick={() => handleCardClick("boisson")}>
                <img src="../../../public/drones/Card3.png" alt="Drone 3" />
                <div className="card-text">Boisson</div>
            </div>
        </div>
    );
}
