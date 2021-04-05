import React from 'react';
import '../styles/Forecast.css';
const Forecast = ({ selectedPlaces, delete2 }) => {
    return (
        <div>
            <ul>
                {selectedPlaces.map(selectedPlace =>
                    <li key={selectedPlace.id}>
                        {selectedPlace.city}
                        <button onClick={() => {
                            delete2(selectedPlace.id)
                        }}>Usuń pozycję</button>
                    </li>)}
            </ul>
        </div>
    );

}

export default Forecast;