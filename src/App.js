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

    const [imageUrls, setImageUrls] = useState([
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGpni2Q9H7Haba9lTqFtmLAmeyo30ziRL_H2vkte2uknSnQyyvJnMWs1GaJKfuKE3ozO8&usqp=CAU",

        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR49rWErL0HxhWRfgw_lG0Gjme5hOsutJHnIg&usqp=CAU",

        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCiMh_PJug-MaZtZQaQPmlxZMMZj7P-UZ05A&usqp=CAU",

        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSm3eblahJKldydr-kH-YvT2sXifBpeolqu1g&usqp=CAU"
    ]);


    const [activeIndex, setActiveIndex] = useState(0);

    const handleChangeSlide = (slideVector) => {

        console.log(activeIndex)
        var slideLeft = slideVector === -1;
        var slideLimit = !slideLeft ? imageUrls.length : -1;
        console.log("limit  " + slideLimit)
        console.log("left  " + slideLeft)

        if (activeIndex + slideVector == slideLimit) {
            console.log("zeruje")
            console.log("zeruje do   " + (slideLeft ? imageUrls.length - 1 : 0))
            setActiveIndex(slideLeft ? imageUrls.length - 1 : 0);
        } else {
            console.log("ruszam")
            setActiveIndex(prevValue => prevValue + slideVector);
        }

    }




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
                        <ToastContainer />
                    </div>

                    <PlacesList placesList={placesList} deletePlace={handleChoosenPlaceDelete} showInfo={handleMoreBtnClick} />

                    {selectedPlace !== null ? (
                        <PlaceInfo
                            place={selectedPlace}

                        />
                    ) : (<div></div>)}

                </div>
            </div>

            <div className="float-child">
                <ImageSlider imageUrls={imageUrls} activeIndex={activeIndex} handleChange={handleChangeSlide} />
            </div>



            <div className="footer">
                <footer>{<Footer />}</footer>
            </div>

        </div>



    );
}

export default App;
