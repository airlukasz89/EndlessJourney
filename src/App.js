import React, { useEffect, useState } from 'react';


import MapWrapper from './components/MapWrapper';
import Forecast from './components/Forecast';
import Footer from './components/Footer';
import AutoComplete from './components/AutoComplete';

import './App.css';


import Places from './places.json'


const App = () => {
    const [selectedPlaces, setSelectedPlaces] = useState([]);

    const [viewPosition, setViewPosition] = useState({
        position: [52.422058, 16.973800],
        zoom: 30
    });

    const handleSelectPlace = (place) => {
        setViewPosition({
            position: [place.lat, place.lng],
            zoom: viewPosition.zoom
        })
        setSelectedPlaces([...selectedPlaces, place]);
    }

    const handleChoosenPlaceDelete = (id) => {
        const places = [...selectedPlaces];

        const index = places.findIndex(selectedPlace => selectedPlace.id === id);
        places.splice(index, 1);

        setSelectedPlaces(places);
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

    const sortedPlaces = Places.sort(function (a, b) {
        if (a.city < b.city) { return -1; }
        if (a.city > b.city) { return 1; }
        return 0;
    })

    // useEffect(() => {
    //     console.log(position);
    //     console.log(date);
    //     // fetch(`http://history.openweathermap.org/data/2.5/history/city?lat=${position[0]}&lon=${position[1]}&type=hour&start=${date.getTime()}&end=${date.getTime()}&appid=${apiKey}`)

    //     //     .then(response => response.json())
    //     //     .then(data => console.log(data));
    // }, [date, position])

    return (

        <div className="app">
            <header>
                {<MapWrapper viewPosition={viewPosition} selectedPlaces={selectedPlaces} onZoom={handleZoom} onDrag={handleDrag} />}
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
                    {<Forecast selectedPlaces={selectedPlaces} delete2={handleChoosenPlaceDelete} />}
                </section>
            </main>
            <footer>{<Footer />}</footer>
        </div>

    );
}

export default App;
