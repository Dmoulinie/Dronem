import React, { useState, useMemo, useEffect } from "react";
import "./panier.css";

import {getCartByUserId, getDroneById, addToCart, removeFromCart} from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import deleteIcon from "../../assets/delete_icon.svg";

const Panier = ({ open, onClose }) => {
    const { user } = useAuth();
    const [items, setItems] = useState([]);

    // Charger le panier à l'ouverture
    useEffect(() => {
        if (!open || !user?.id) return;

        const loadCart = async () => {
            try {
                const cart = await getCartByUserId(user.id);

                const enriched = await Promise.all(
                    cart.map(async (entry) => {
                        const drone = await getDroneById(entry.id_drone);

                        return {
                            id: entry.id_drone,
                            quantity: Number(entry.quantity),
                            name: drone.name,
                            price: drone.price,
                            image: `http://localhost:8080/public/${drone.image_path}`,
                        };
                    })
                );

                setItems(enriched);
            } catch (err) {
                console.error("❌ Erreur chargement panier :", err);
            }
        };

        loadCart();
    }, [open, user]);

    // Modifier quantité localement
    const updateQuantity = async (id, delta) => {
        const item = items.find((i) => i.id === id);
        if (!item) return;

        // update backend
        await addToCart(user.id, id, delta);

        // update local
        setItems((prev) =>
            prev.map((i) =>
                i.id === id
                    ? { ...i, quantity: Math.max(1, i.quantity + delta) }
                    : i
            )
        );
    };

    // suppression réelle
    const removeItem = async (id) => {
        const item = items.find((i) => i.id === id);
        if (!item) return;

        // 🔥 supprimer tout d'un coup
        await removeFromCart(user.id, id);

        // update local
        setItems((prev) => prev.filter((i) => i.id !== id));
    };

    // Total CFP
    const total = useMemo(
        () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
        [items]
    );

    return (
        <>
            <div
                className={`panier-overlay ${open ? "show" : ""}`}
                onClick={onClose}
            />

            <div className={`panier-slide-left ${open ? "open" : ""}`}>
                <button className="close-left-btn" onClick={onClose}>✖</button>

                <div className="panier-container">
                    <h2 className="panier-title">Votre Panier</h2>

                    {items.length === 0 && (
                        <p className="panier-empty">Votre panier est vide.</p>
                    )}

                    <ul className="panier-list">
                        {items.map((item) => (
                            <li key={item.id} className="panier-item">
                                <img src={item.image} alt={item.name} className="panier-item-img" />

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
                                            onChange={(e) =>
                                                updateQuantity(item.id, Number(e.target.value) - item.quantity)
                                            }
                                        />

                                        <button onClick={() => updateQuantity(item.id, +1)}>+</button>
                                    </div>
                                    <p className="subtotal">
                                        Sous-total : {item.price * item.quantity} CFP
                                    </p>
                                </div>

                                <div className="panier-item-actions">
                                    <img
                                        src={deleteIcon}
                                        alt="Supprimer"
                                        className="trash-icon"
                                        onClick={() => removeItem(item.id)}
                                    />
                                </div>
                            </li>
                        ))}
                    </ul>

                    {items.length > 0 && (
                        <div className="panier-footer">
                            <h3>Total : {total} CFP</h3>
                            <button className="checkout-btn">
                                Passer à la caisse
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Panier;
