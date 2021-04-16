import React from 'react';
const PlaceInfo = ({ place }) => {
    return (
        <div>
            <p>{place.city}</p>
            <p>Współrzędne GPS:  {`${place.lat}  ${place.lng}`}</p>
            <p>kraj: {`${place.country} ${place.admin_name} `}</p>

        </div>

    )
}

export default PlaceInfo;