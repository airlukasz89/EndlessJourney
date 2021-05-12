
import React, { useState, useEffect } from 'react';
import PlaceListItem from './PlaceListItem';

import '../styles/PlacesList.css';

const PlacesList = ({ placesList, deletePlace, showInfo, selectedPlace }) => {
    const [placeCounterList, setPlaceCounterList] = useState([]);


    const incrementPlaceCounter = (place) => {
        const tempPlaceCounterList = [...placeCounterList];
        const index = tempPlaceCounterList.findIndex(placeCounter => placeCounter.place === place);
        tempPlaceCounterList[index].counter++;
        setPlaceCounterList(tempPlaceCounterList);
        console.log(placeCounterList);
    }
    const handleShowInfo = (place) => {
        showInfo(place);
        incrementPlaceCounter(place);
    }


    useEffect(() => {
        setPlaceCounterList(placesList.map(place => ({
            place,
            counter: 0
        })))
    }, [placesList, selectedPlace])

    return (
        <div>
            <ul>
                {placeCounterList.map(placeCounter =>
                    <PlaceListItem place={placeCounter.place} deletePlace={deletePlace} showInfo={handleShowInfo} isActive={placeCounter.place === selectedPlace && placeCounter.counter % 2 === 0} />)}
            </ul>
        </div>
    );

}

export default PlacesList;