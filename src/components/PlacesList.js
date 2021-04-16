import React from 'react';
import '../styles/PlacesList.css';
const PlacesList = ({ placesList, deletePlace, showInfo }) => {
    return (
        <div>
            <ul>
                {placesList.map(place =>
                    <li key={place.id}>
                        {place.city}
                        <button onClick={() => {
                            deletePlace(place.id)
                        }}>Usuń pozycję</button>
                        <button onClick={() => {
                            showInfo(place)
                        }}>Więcej</button>
                    </li>)}
            </ul>
        </div>
    );

}

export default PlacesList;