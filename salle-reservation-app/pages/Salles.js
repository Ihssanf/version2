import React, { useState, useEffect } from 'react';
import SalleCard from '../components/SalleCard';
import ReservationForm from '../components/ReservationForm';

function Salles() {
    const [salles, setSalles] = useState([]);
    const [selectedSalleId, setSelectedSalleId] = useState(null);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        fetch('/salle') // Utilisation du nouvel endpoint pour récupérer les salles
            .then(res => res.json())
            .then(data => setSalles(data))
            .catch(error => console.error("Erreur lors de la récupération des salles:", error));
    }, []);

    const handleSelectSalle = (salleId) => {
        setSelectedSalleId(salleId);
        setShowForm(true);
    };

    const handleReservationSubmit = () => {
        setShowForm(false);
        setSelectedSalleId(null);
    };

    return (
        <div>
            <h2>Liste des Salles</h2>
            <div className="salles-container">
                {salles.map((salle) => (
                    <SalleCard key={salle.id} salle={salle} onSelect={handleSelectSalle} />
                ))}
            </div>
            {showForm && <ReservationForm salleId={selectedSalleId} onSubmit={handleReservationSubmit} />}
        </div>
    );
}

export default Salles;