import React, { useState } from 'react';

const PlaceListItem = ({ place, deletePlace, showInfo, isActive }) => {

    return (
        <li key={place.id}>
            {place.city}
            <button onClick={() => {
                deletePlace(place)
            }}>Usuń pozycję</button>
            <button onClick={() => {
                showInfo(place)
            }}>{isActive ? 'Ukryj' : 'Więcej'}</button>
        </li>
    );
}

export default PlaceListItem;