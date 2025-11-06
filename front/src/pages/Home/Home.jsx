import "../../assets/styles/style.css";
import "./home.css"
export default function Home() {
    return (
        <div className="cards">
            <div className="card">
                <img src="../../../public/drones/Card1.jpg" alt="Drone 1" />
                <div className="card-text">Froid</div>
            </div>
            <div className="card">
                <img src="../../../public/drones/Card2.jpg" alt="Drone 2" />
                <div className="card-text">Chaud</div>
            </div>
            <div className="card">
                <img src="../../../public/drones/Card3.jpg" alt="Drone 3" />
                <div className="card-text">Boisson</div>
            </div>
        </div>
    );
}
