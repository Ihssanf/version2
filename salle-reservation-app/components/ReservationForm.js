import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

function ReservationForm({ salleId, onSubmit }) {
    const [date, setDate] = useState(new Date());
    const [heureDebut, setHeureDebut] = useState("");
    const [heureFin, setHeureFin] = useState("");
    const [utilisateur, setUtilisateur] = useState("");
    const [error, setError] = useState("");

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        // Conversion des heures en string (necessaire pour le backend)
        const startTimeString = heureDebut;
        const endTimeString = heureFin;
        const formattedDate = date.toISOString().split('T')[0];

        if (!startTimeString || !endTimeString) {
            setError("Veuillez sélectionner une heure de début et de fin.");
            return;
        }

        const reservationData = {
            salle: { id: salleId },
            date: formattedDate,
            heureDebut: startTimeString,
            heureFin: endTimeString,
            utilisateur: utilisateur,
        };
        try {
            const response = await fetch("/reservation/ajouter", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(reservationData),
            });
            if (response.ok) {
                onSubmit();
                alert("Réservation faite avec succès !");
            } else {
                const errorData = await response.json();
                setError(errorData.message || "Erreur lors de la réservation.");
            }
        } catch (error) {
            setError("Une erreur s'est produite lors de la requête.");
        }
    };

    return (
        <form className="reservation-form" onSubmit={handleFormSubmit}>
            <label>Date:</label>
            <DatePicker selected={date} onChange={(date) => setDate(date)} dateFormat="yyyy-MM-dd" />

            <label>Heure de début:</label>
            <input type="time" value={heureDebut} onChange={(e) => setHeureDebut(e.target.value)} required />

            <label>Heure de fin:</label>
            <input type="time" value={heureFin} onChange={(e) => setHeureFin(e.target.value)} required />

            <label>Nom d'utilisateur:</label>
            <input type="text" value={utilisateur} onChange={(e) => setUtilisateur(e.target.value)} required />

            <button type="submit">Valider la réservation</button>
            {error && <p className="error">{error}</p>}
        </form>
    );
}

export default ReservationForm;