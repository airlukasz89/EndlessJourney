import React from 'react';
const PlaceInfo = ({ place }) => {
    return (
        <div>
            <p>{place.city}</p>
            <p>{`${place.lat} ${place.lng}`}</p>
        </div>

    )
}

export default PlaceInfo;