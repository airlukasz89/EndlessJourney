import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import MapWrapper from './components/MapWrapper';
import PlacesList from './components/PlacesList';
import Footer from './components/Footer';
import AutoComplete from './components/AutoComplete';
import PlaceInfo from './components/PlaceInfo';
import ImageSlider from './components/ImageSlider';



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

        if (placesList.includes(place)) {
            toast("Miasto jest już na liście!");

        } else {
            setPlacesList([...placesList, place]);
        }
    }

    const handleClickOnMap = (position) => {
        setViewPosition({
            position: [position.lat, position.lng],
            zoom: viewPosition.zoom
        })
        let newPlace = {
            city: "bla bla",
            country: "5555",
            admin_name: 'Polska',
            lat: position.lat,
            lng: position.lng

        }
        if (placesList.includes(newPlace)) {
            toast("Miasto jest już na liście!");

        } else {
            setPlacesList([...placesList, newPlace]);
        }

        setSelectedPlace(newPlace);
    }

    const handleChoosenPlaceDelete = (place) => {
        const places = [...placesList];

        const index = places.findIndex(p => p === place);
        places.splice(index, 1);
        if (selectedPlace !== null && selectedPlace === place) {
            setSelectedPlace(null);
        }
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
        setViewPosition({
            position: [place.lat, place.lng],
            zoom: viewPosition.zoom
        });
        if (selectedPlace === place) {
            setSelectedPlace(null);
        } else {
            setSelectedPlace(place)
        }
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
            <div className="float-container">

                <div className="float-child">
                    <MapWrapper viewPosition={viewPosition} placesList={placesList} onZoom={handleZoom} onDrag={handleDrag} onClick={handleClickOnMap} />
                </div>

                <div className="float-child">
                    <div className="autoComplete">
                        <AutoComplete onSelect={handleSelectPlace} suggestionsParam={sortedPlaces} fieldCallback={place => place.city} />
                        <ToastContainer />
                    </div>

                    <PlacesList placesList={placesList} deletePlace={handleChoosenPlaceDelete} showInfo={handleMoreBtnClick} selectedPlace={selectedPlace} />

                    {selectedPlace !== null ? (
                        <PlaceInfo
                            place={selectedPlace}

                        />
                    ) : (<div></div>)}

                </div>
            </div>
            <div className="float-container">
                <div className="float-child">
                    {selectedPlace !== null ? (
                        <ImageSlider
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
