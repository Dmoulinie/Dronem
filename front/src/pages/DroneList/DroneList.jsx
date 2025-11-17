import "./droneList.css";
import { getAllDrones } from "../../services/api";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function DroneList() {
    const [allDrones, setAllDrones] = useState([]);

    useEffect(() => {
        getAllDrones().then(setAllDrones).catch(console.error);
    }, []);

    return (
        <>
            <div className={"title-text-droneList"}>
                <h1>Nos choix de drones</h1>
                <small className={"title-small-text-droneList"}>
                    Nous vous proposons différents types de drones de livraisons. <br />
                    Voici quelques-unes de nos sélections les plus populaires :
                </small>
            </div>

            <div className={"cards-drone"}>
                {allDrones.map((drone) => (
                    <NavLink
                        key={drone.id}
                        to={`/product/${drone.id}`}
                        className={"card-drone"}
                    >
                        <img
                            src={`http://localhost:8080/public/${drone.image_path}`}
                            className={"card-drone-img"}
                            alt={drone.name}
                        />

                        <div className={"card-drone-content"}>
                            <h2 className={"card-drone-title"}>{drone.name}</h2>
                            <p className={""}>{drone.price} Francs</p>
                            <p className={"card-drone-model"}>{drone.model}</p>
                        </div>
                    </NavLink>
                ))}
            </div>
        </>
    );
}
