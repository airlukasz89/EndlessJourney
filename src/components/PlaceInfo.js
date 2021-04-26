import React from 'react';
const PlaceInfo = ({ place }) => {
    return (
        <div>
            <p>{place.city}</p>
            <p><strong>współrzędne GPS:</strong>  {`${place.lat}  ${place.lng}`}</p>
            <p><strong>kraj:</strong> {`${place.country}`}</p>
            <p><strong>dystrykt:</strong>{`${place.admin_name}`}</p>

        </div>

    )
}

export default PlaceInfo;