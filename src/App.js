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


    const getRandomNumber = () => Math.floor(Math.random() * 600)
    const [imageUrls, setImageUrls] = useState([

        "https://picsum.photos/200?x=" + getRandomNumber(),
        "https://picsum.photos/200?x=" + getRandomNumber(),
        "https://picsum.photos/200?x=" + getRandomNumber(),
        "https://picsum.photos/200?x=" + getRandomNumber(),
        "https://picsum.photos/200?x=" + getRandomNumber(),
        "https://picsum.photos/200?x=" + getRandomNumber(),
        "https://picsum.photos/200?x=" + getRandomNumber(),
        "https://picsum.photos/200?x=" + getRandomNumber(),

    ]);



    const [activeIndex, setActiveIndex] = useState(0);

    const [translateValue, setTranslateValue] = useState(0);

    const handleGoToPrevSlide = () => {
        if (activeIndex === 0) {
            return;
        } else {
            setActiveIndex(prevState => prevState - 1);
            setTranslateValue(prevState => prevState + slideWidth())
        }

    }


    const handleGoToNextSlide = () => {
        // Exiting the method early if we are at the end of the images array.
        // We also want to reset currentIndex and translateValue, so we return
        // to the first image in the array.
        if (activeIndex === imageUrls.length - 1) {
            setActiveIndex(0);
            setTranslateValue(0);
        } else {
            setActiveIndex(prevState => prevState + 1);
            setTranslateValue(prevState => prevState + -(slideWidth()))
        }

        // This will not run if we met the if condition above


    }

    const slideWidth = () => {
        return document.querySelector('.slide').clientWidth
    }




    // const handleSliderSlide = (slideVector) => {

    //     console.log(activeIndex)
    //     var slideLeft = slideVector === -1;
    //     var slideLimit = !slideLeft ? imageUrls.length : -1;
    //     console.log("limit  " + slideLimit)
    //     console.log("left  " + slideLeft)

    //     if (activeIndex + slideVector == slideLimit) {
    //         console.log("zeruje")
    //         console.log("zeruje do   " + (slideLeft ? imageUrls.length - 1 : 0))
    //         setActiveIndex(slideLeft ? imageUrls.length - 1 : 0);
    //     } else {
    //         console.log("ruszam")
    //         setActiveIndex(prevValue => prevValue + slideVector);
    //     }

    // }


    // const handleSliderChange = (index) => {
    //     setActiveIndex(index)
    // }


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


        if (selectedPlace === place) {
            toggleImageSlider()
        } else {
            setIsVisibleImageSlider(true);
        }
        setSelectedPlace(place);

        setViewPosition({
            position: [place.lat, place.lng],
            zoom: viewPosition.zoom
        });
    }

    const [isVisibleImageSlider, setIsVisibleImageSlider] = useState(false);
    const toggleImageSlider = () => {
        setIsVisibleImageSlider(prev => !prev);
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
            <div className="float-container">
                <div className="float-child">
                    {isVisibleImageSlider ? (
                        <ImageSlider imageUrls={imageUrls} activeIndex={activeIndex} translateValue={translateValue} slidePrev={handleGoToPrevSlide} slideNext={handleGoToNextSlide} slideWidth={slideWidth} />
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
