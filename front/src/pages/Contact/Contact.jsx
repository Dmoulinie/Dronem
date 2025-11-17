import React from "react";
import "./contact.css";

const ContactPage = () => {
    return (
        <div className="contact-page">
            {/* SECTION HERO / CARTE MONDE */}
            <section className="contact-hero">
                <div className="contact-hero__content">

                    <h1 className="contact-hero__title">Contact</h1>

                    <p className="contact-hero__subtitle">
                        N&apos;hésitez pas à nous contacter ou même passer à l&apos;agence.
                        Nous nous ferons un plaisir de vous recevoir et d'échanger autour d&apos;un café :)
                    </p>
                </div>

                <section className="contact-location">
                    {/* COLONNE 1/3 : HORAIRES */}
                    <div className="contact-location__hours">
                        <h2 className="contact-section-title">Horaires &amp; accès</h2>

                        <p className="contact-location__address">
                            Campus de Nouville<br />
                            BP R4 - 98851 Nouméa Cedex<br />
                            Institut d&apos;Administration des Entreprises (IAE NC)
                        </p>

                        <div className="contact-location__schedule">
                            <div className="schedule-row">
                                <span className="schedule-day">Lundi</span>
                                <span className="schedule-time">08h00 – 12h00 / 13h00 – 17h00</span>
                            </div>
                            <div className="schedule-row">
                                <span className="schedule-day">Mardi</span>
                                <span className="schedule-time">08h00 – 12h00 / 13h00 – 17h00</span>
                            </div>
                            <div className="schedule-row">
                                <span className="schedule-day">Mercredi</span>
                                <span className="schedule-time">08h00 – 12h00 / 13h00 – 17h00</span>
                            </div>
                            <div className="schedule-row">
                                <span className="schedule-day">Jeudi</span>
                                <span className="schedule-time">08h00 – 12h00 / 13h00 – 17h00</span>
                            </div>
                            <div className="schedule-row">
                                <span className="schedule-day">Vendredi</span>
                                <span className="schedule-time">08h00 – 12h00 / 13h00 – 16h00</span>
                            </div>
                            <div className="schedule-row schedule-row--closed">
                                <span className="schedule-day">Samedi</span>
                                <span className="schedule-time">Fermé</span>
                            </div>
                            <div className="schedule-row schedule-row--closed">
                                <span className="schedule-day">Dimanche</span>
                                <span className="schedule-time">Fermé</span>
                            </div>
                        </div>

                        <p className="contact-location__note">
                            Les horaires peuvent varier lors des congés universitaires.
                        </p>
                    </div>

                    {/* COLONNE 2/3 : MAP IAE */}
                    <div className="contact-location__map-wrapper">
                        <div className="contact-location__map">
                            <iframe
                                title="Carte IAE Nouvelle-Calédonie"
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                src="https://www.google.com/maps?q=-22.26109676891059, 166.40213055324787&z=17&hl=fr&output=embed"
                            />
                        </div>
                    </div>
                </section>
            </section>

            {/* SECTION HORAIRES + MAP IAE */}


            {/* SECTION FORMULAIRE + INFOS AGENCE */}
            <section className="contact-main">
                {/* FORMULAIRE */}
                <div className="contact-form">
                    <h2 className="contact-section-title">Laissez-nous un message</h2>

                    <form className="contact-form__body">
                        <div className="contact-form__field">
                            <input
                                type="text"
                                name="name"
                                placeholder="Prénom & Nom"
                                className="contact-input"
                            />
                        </div>

                        <div className="contact-form__field">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                className="contact-input"
                            />
                        </div>

                        <div className="contact-form__field">
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Téléphone"
                                className="contact-input"
                            />
                        </div>

                        <div className="contact-form__field">
                            <textarea
                                name="message"
                                placeholder="Message"
                                className="contact-textarea"
                            />
                        </div>

                        <div className="contact-form__legal">
                            <label className="checkbox-wrapper">
                                <input type="checkbox" name="accept_legal" />
                                <span className="checkbox-label">
                                    J&apos;accepte les mentions légales &amp; politique de
                                    confidentialité
                                </span>
                            </label>
                        </div>

                        <button type="submit" className="contact-button">
                            Envoyer
                        </button>
                    </form>
                </div>

                {/* INFOS AGENCE */}
                <aside className="contact-info">
                    <h2 className="contact-section-title">Infos agence</h2>

                    <div className="contact-info__item">
                        <div className="contact-info__icon">
                            <span className="icon-placeholder">👤</span>
                        </div>
                        <p className="contact-info__text">
                            Campus de Nouville - BP R4 98851 Nouméa Cedex
                        </p>
                    </div>

                    <div className="contact-info__item">
                        <div className="contact-info__icon">
                            <span className="icon-placeholder">✉️</span>
                        </div>
                        <p className="contact-info__text">
                            <a href="mailto:contact@dronem.nc">
                                contact@dronem.nc
                            </a>
                        </p>
                    </div>

                    <div className="contact-info__item">
                        <div className="contact-info__icon">
                            <span className="icon-placeholder">📱</span>
                        </div>
                        <p className="contact-info__text">
                            <a href="tel:+687878450">+687 87 84 50</a>
                        </p>
                    </div>
                </aside>
            </section>
        </div>
    );
};

export default ContactPage;
