import React from 'react';
import '../styles/Forecast.css';
const Forecast = ({ selectedPlaces }) => {
    return (
        <div className="App">
            <ul >
                {selectedPlaces.map(selectedPlace => <li>{selectedPlace.city}</li>)}
            </ul>
        </div>
    );

}

export default Forecast;