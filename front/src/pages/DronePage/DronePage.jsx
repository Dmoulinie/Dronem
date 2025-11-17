import "./dronePage.css";

export default function DronePage() {
    return (
        <main className="content-product">
            <h1>BougnaFly</h1>

            {/* Conteneur texto + image */}
            <div className="content-row">

                {/* Zone texte à gauche */}
                <div className="product-text">
                    <div className="product-info">
                        <p><span>Modèle :</span> BG-FL</p>
                        <p><span>Catégorie :</span> Chaud</p>
                        <p><span>Batterie :</span> Racines de taro 4500mAh</p>
                        <p><span>Vitesse :</span> 160</p>
                        <p><span>Prix :</span> 81 900</p>
                    </div>

                    <label id={"description-label"}>Description : </label>
                    <p id={"description"}>
                        L'âme du Caillou dans un drone. Cuit à la vapeur de coco et piloté à la main
                        en feuilles de bananier, le BougnaFly allie tradition et technologie.
                        Il ne vole pas : il plane avec respect.
                    </p>
                    <br/>
                    <button className={"btn-panier"}> Ajouter au panier </button>
                </div>

                {/* Image à droite */}
                <div className="product-image">
                    <img src="../../../public/drones/Drone1.png" alt="Drone" />
                </div>
            </div>
        </main>
    );
}
