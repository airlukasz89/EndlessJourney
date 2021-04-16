import React from 'react';
import '../styles/PlacesList.css';
const PlacesList = ({ placesList, delete2: deletePlace }) => {
    return (
        <div>
            <ul>
                {placesList.map(place =>
                    <li key={place.id}>
                        {place.city}
                        <button onClick={() => {
                            deletePlace(place.id)
                        }}>Usuń pozycję</button>
                    </li>)}
            </ul>
        </div>
    );

}

export default PlacesList;