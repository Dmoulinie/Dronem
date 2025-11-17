import React, { useState, useMemo } from "react";
import "./panier.css";

const Panier = ({ open, onClose }) => {
    const [items, setItems] = useState([
        { id: 1, name: "Produit A", price: 1490, quantity: 1, img: "/img/productA.jpg" },
        { id: 2, name: "Produit B", price: 990, quantity: 2, img: "/img/productB.jpg" }
    ]);

    const updateQuantity = (id, delta) => {
        setItems(prev =>
            prev.map(item =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                    : item
            )
        );
    };

    const setQuantityDirect = (id, value) => {
        const parsed = Number(value);
        setItems(prev =>
            prev.map(item =>
                item.id === id
                    ? { ...item, quantity: parsed > 0 ? parsed : 1 }
                    : item
            )
        );
    };

    const removeItem = id => {
        setItems(prev => prev.filter(item => item.id !== id));
    };

    const total = useMemo(
        () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
        [items]
    );

    return (
        <>
            {/* ----- OVERLAY (fond assombri) ----- */}
            <div className={`panier-overlay ${open ? "show" : ""}`} onClick={onClose} />

            {/* ----- SLIDE PANEL ----- */}
            <div className={`panier-slide-left ${open ? "open" : ""}`}>

                <button className="close-left-btn" onClick={onClose}>✖</button>

                <div className="panier-container">
                    <h2 className="panier-title">Votre Panier</h2>

                    {items.length === 0 && (
                        <p className="panier-empty">Votre panier est vide.</p>
                    )}

                    <ul className="panier-list">
                        {items.map(item => (
                            <li key={item.id} className="panier-item">
                                <img src={item.img} alt={item.name} className="panier-item-img" />

                                <div className="panier-item-info">
                                    <h3>{item.name}</h3>
                                    <p className="price">{(item.price / 100).toFixed(2)} €</p>

                                    <div className="quantity-controls">
                                        <button onClick={() => updateQuantity(item.id, -1)}>−</button>

                                        <input
                                            type="number"
                                            min="1"
                                            className="quantity-input"
                                            value={item.quantity}
                                            onChange={e => setQuantityDirect(item.id, e.target.value)}
                                        />

                                        <button onClick={() => updateQuantity(item.id, +1)}>+</button>
                                    </div>
                                </div>

                                <div className="panier-item-actions">
                                    <p className="subtotal">
                                        Sous-total : {((item.price * item.quantity) / 100).toFixed(2)} €
                                    </p>

                                    <button className="remove-btn" onClick={() => removeItem(item.id)}>
                                        Supprimer
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <div className="panier-footer">
                        <h3>Total : {(total / 100).toFixed(2)} €</h3>
                        <button className="checkout-btn">Passer à la caisse</button>
                    </div>
                </div>

            </div>
        </>
    );
};

export default Panier;
