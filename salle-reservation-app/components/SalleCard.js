import React from 'react';

function SalleCard({ salle, onSelect }) {
    return (
        <div className="salle-card">
            <h3>{salle.nom}</h3>
            <p>Capacité: {salle.capacite}</p>
            <p>Équipements: {salle.equipements}</p>
            <button onClick={() => onSelect(salle.id)}>Réserver</button>
        </div>
    );
}

export default SalleCard;