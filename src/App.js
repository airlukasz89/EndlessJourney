import React, { useEffect, useState } from 'react';


import MapWrapper from './components/MapWrapper';
import PlacesList from './components/PlacesList';
import Footer from './components/Footer';
import AutoComplete from './components/AutoComplete';
import PlaceInfo from './components/PlaceInfo';

import './App.css';


import Places from './places.json'


const App = () => {
    const [placesList, setPlacesList] = useState([]);

    const [viewPosition, setViewPosition] = useState({
        position: [52.422058, 16.973800],
        zoom: 30
    });

    const [selectedPlace, setSelectedPlace] = useState(null);

    const handleSelectPlace = (place) => {
        setViewPosition({
            position: [place.lat, place.lng],
            zoom: viewPosition.zoom
        })
        setPlacesList([...placesList, place]);
    }

    const handleChoosenPlaceDelete = (id) => {
        const places = [...placesList];

        const index = places.findIndex(selectedPlace => selectedPlace.id === id);
        places.splice(index, 1);

        setPlacesList(places);
    }

    const handleZoom = (newZoom, newPosition) => {
        setViewPosition({
            position: [newPosition.lat, newPosition.lng],
            zoom: newZoom
        })
    }

    const handleDrag = (newPosition) => {
        setViewPosition({
            position: [newPosition.lat, newPosition.lng],
            zoom: viewPosition.zoom
        })
    }

    const handleMoreBtnClick = (place) => {
        setSelectedPlace(place);
        setViewPosition({
            position: [place.lat, place.lng],
            zoom: viewPosition.zoom
        });
    }



    const sortedPlaces = Places.sort(function (a, b) {
        if (a.city < b.city) { return -1; }
        if (a.city > b.city) { return 1; }
        return 0;
    })

    useEffect(() => {
        setPlacesList([...placesList, Places[0], Places[1]]);
    }, [])

    return (

        <div className="app">
            {/* <header>
                {<MapWrapper viewPosition={viewPosition} placesList={placesList} onZoom={handleZoom} onDrag={handleDrag} />}
            </header>
            <main>
                <aside>

                    <label>
                        <div className="autoComplete">
                            <AutoComplete onSelect={handleSelectPlace} suggestionsParam={sortedPlaces} fieldCallback={place => place.city} />
                        </div>
                    </label>

                </aside>
                <section className="date">
                    {<PlacesList placesList={placesList} deletePlace={handleChoosenPlaceDelete} showInfo={handleMoreBtnClick} />}

                </section>
                <section className="date">
                    {selectedPlace !== null ? (
                        <PlaceInfo
                            place={selectedPlace}
                        />
                    ) : (<div></div>)}
                </section>
            </main>
            <footer>{<Footer />}</footer> */}


            <div className="float-container">

                <div className="float-child">
                    <MapWrapper viewPosition={viewPosition} placesList={placesList} onZoom={handleZoom} onDrag={handleDrag} />
                </div>

                <div className="float-child">
                    <div className="autoComplete">
                        <AutoComplete onSelect={handleSelectPlace} suggestionsParam={sortedPlaces} fieldCallback={place => place.city} />
                    </div>

                    <PlacesList placesList={placesList} deletePlace={handleChoosenPlaceDelete} showInfo={handleMoreBtnClick} />

                    {selectedPlace !== null ? (
                        <PlaceInfo
                            place={selectedPlace}
                        />
                    ) : (<div></div>)}

                </div>



            </div>
            <div className="footer">
                <footer>{<Footer />}</footer>
            </div>

        </div>



    );
}

export default App;
