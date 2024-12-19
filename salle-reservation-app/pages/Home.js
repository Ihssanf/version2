import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Importez votre fichier CSS

function Home() {
    return (
        <div className="home-container">
            <div className="hero-section">
                <h1>Bienvenue sur notre plateforme de réservation de salles</h1>
                <p>Trouvez et réservez la salle idéale pour vos réunions.</p>
                <Link to="/salles">
                    <button className="reserve-button">Réserver une salle</button>
                </Link>
            </div>
        </div>
    );
}

export default Home;