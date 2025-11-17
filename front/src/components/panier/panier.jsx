import React, { useState, useMemo, useEffect } from "react";
import "./panier.css";

import { getCartByUserId } from "../../services/api";
import { useAuth } from "../../context/AuthContext";

const Panier = ({ open, onClose }) => {
    const { user } = useAuth(); // 🔥 Récupère l'utilisateur connecté
    const [items, setItems] = useState([]);

    // Charger le panier quand on ouvre le component
    useEffect(() => {
        if (!open || !user?.id) return;

        const loadCart = async () => {
            try {
                const cart = await getCartByUserId(user.id);

                // Ton backend retourne quoi ?
                // Ici j'assume : { items: [ ... ] }
                setItems(cart.items || []);
            } catch (err) {
                console.error("❌ Erreur récupération panier :", err);
            }
        };

        loadCart();
    }, [open, user]);

    // Modifier quantité
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

    // TOTAL CFP sans virgule
    const total = useMemo(
        () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
        [items]
    );

    return (
        <>
            {/* Overlay sombre */}
            <div
                className={`panier-overlay ${open ? "show" : ""}`}
                onClick={onClose}
            />

            {/* Slide panel */}
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
                                <img src={item.image || item.img} alt={item.name} className="panier-item-img" />

                                <div className="panier-item-info">
                                    <h3>{item.name}</h3>

                                    <p className="price">{item.price} CFP</p>

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
                                        Sous-total : {item.price * item.quantity} CFP
                                    </p>

                                    <button className="remove-btn" onClick={() => removeItem(item.id)}>
                                        Supprimer
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>

                    {items.length > 0 && (
                        <div className="panier-footer">
                            <h3>Total : {total} CFP</h3>
                            <button className="checkout-btn">Passer à la caisse</button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Panier;
