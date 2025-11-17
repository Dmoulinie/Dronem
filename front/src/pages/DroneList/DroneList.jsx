import { NavLink } from "react-router-dom";
import "./droneList.css";

export default function DroneList() {
    return (
        <>
            <div className={"title-text-droneList"}>
                <h1>Nos choix de drones</h1>
                <small className={"title-small-text-droneList"}>
                    Nous vous proposons différents types de drones de livraisons. <br></br>
                    Voici quelques-unes de nos sélections les plus populaires :
                </small>
            </div>
            <div className={"cards-drone"}>
                <div className={"card-drone"}>
                    <img src="../../../public/drones/Drone1.png" className={"card-drone-img"} alt="DJI Mavic 3"></img>
                    <div className="card-drone-content">
                        <h2 className="card-drone-title">DJI Mavic 3</h2>
                        <p className="card-drone-description">Caméra Hasselblad 4/3</p>
                    </div>
                </div>
                <div className={"card-drone"}>
                    <img src="../../../public/drones/Drone1.png" className={"card-drone-img"} alt="DJI Air 2S"></img>
                    <div className="card-drone-content">
                        <h2 className="card-drone-title">DJI Air 2S</h2>
                        <p className="card-drone-description">Capteur 1 pouce 5.4K</p>
                    </div>
                </div>
                <div className={"card-drone"}>
                    <img src="../../../public/drones/Drone1.png" className={"card-drone-img"} alt="DJI Mini 3 Pro"></img>
                    <div className="card-drone-content">
                        <h2 className="card-drone-title">DJI Mini 3 Pro</h2>
                        <p className="card-drone-description">Ultra léger & compact</p>
                    </div>
                </div>
                <div className={"card-drone"}>
                    <img src="../../../public/drones/Drone1.png" className={"card-drone-img"} alt="Parrot Anafi"></img>
                    <div className="card-drone-content">
                        <h2 className="card-drone-title">Parrot Anafi</h2>
                        <p className="card-drone-description">4K HDR Professionnel</p>
                    </div>
                </div>
                <div className={"card-drone"}>
                    <img src="../../../public/drones/Drone1.png" className={"card-drone-img"} alt="Autel EVO II"></img>
                    <div className="card-drone-content">
                        <h2 className="card-drone-title">Autel EVO II</h2>
                        <p className="card-drone-description">Caméra 8K</p>
                    </div>
                </div>
                <div className={"card-drone"}>
                    <img src="../../../public/drones/Drone1.png" className={"card-drone-img"} alt="Skydio 2"></img>
                    <div className="card-drone-content">
                        <h2 className="card-drone-title">Skydio 2</h2>
                        <p className="card-drone-description">IA & Autonomie</p>
                    </div>
                </div>
            </div>
        </>
    );
}
