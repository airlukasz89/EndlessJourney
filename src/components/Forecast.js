import React from 'react';
import '../styles/Forecast.css';
const Forecast = ({ selectedPlaces, delete2: deletePlace }) => {
    return (
        <div>
            <ul>
                {selectedPlaces.map(selectedPlace =>
                    <li key={selectedPlace.id}>
                        {selectedPlace.city}
                        <button onClick={() => {
                            deletePlace(selectedPlace.id)
                        }}>Usuń pozycję</button>
                    </li>)}
            </ul>
        </div>
    );

}

export default Forecast;