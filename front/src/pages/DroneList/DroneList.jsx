import "./droneList.css";
import { getAllDrones } from "../../services/api";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function DroneList() {
    const [allDrones, setAllDrones] = useState([]);
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        getAllDrones().then(setAllDrones).catch(console.error);
    }, []);

    // Filtrage
    const filteredDrones = allDrones.filter((drone) => {
        if (filter === "all") return true;
        return drone.category?.toLowerCase() === filter;
    });

    return (
        <>
            <div className={"title-text-droneList"}>
                <h1>Nos choix de drones</h1>
                <small className={"title-small-text-droneList"}>
                    Nous vous proposons différents types de drones de livraisons. <br />
                    Voici quelques-unes de nos sélections les plus populaires :
                </small>
            </div>

            <div className="filter-group">
                <button
                    className={filter === "all" ? "filter-btn active" : "filter-btn"}
                    onClick={() => setFilter("all")}
                >
                    Tous
                </button>

                <button
                    className={filter === "chaud" ? "filter-btn active" : "filter-btn"}
                    onClick={() => setFilter("chaud")}
                >
                    Chaud
                </button>

                <button
                    className={filter === "froid" ? "filter-btn active" : "filter-btn"}
                    onClick={() => setFilter("froid")}
                >
                    Froid
                </button>

                <button
                    className={filter === "boisson" ? "filter-btn active" : "filter-btn"}
                    onClick={() => setFilter("boisson")}
                >
                    Boisson
                </button>

                {/* Le slider animé */}
                <span className={`filter-slider ${filter}`}></span>
            </div>

            {/* ---- CARTES ---- */}
            <div className={"cards-drone"}>
                {filteredDrones.map((drone) => (
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
                            <p>{drone.price} Francs</p>
                            <p className={"card-drone-model"}>{drone.model}</p>
                        </div>
                    </NavLink>
                ))}
            </div>
        </>
    );
}
