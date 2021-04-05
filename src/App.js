import React, { useEffect, useState } from 'react';


import MapWrapper from './components/MapWrapper';
import Forecast from './components/Forecast';
import Footer from './components/Footer';
import AutoComplete from './components/AutoComplete';

import './App.css';


import Places from './places.json'


const App = () => {
    const [position, setPosition] = useState([52.422058, 16.973800]);

    const [date, setDate] = useState(new Date());

    const [selectedPlaces, setSelectedPlaces] = useState([]);

    // state  {position: [52.422058, 16.973800]

    const apiKey = '1e5c1d3bb87cf0a80418d12c9f172264';

    const browserChoices = [
        'Chrome',
        'Firefox',
        'Iceweasel',
        'Internet Explorer',
        'Opera',
        'Safari',
        'Vivaldi'
    ]


    const handleChangePosition = (newPosition) => {
        setPosition(newPosition)
        // this.setState({
        //   position: [1, 1]
        // })
    }


    const handleSelectPlace = (place) => {
        setPosition([place.lat, place.lng]);
        setSelectedPlaces([...selectedPlaces, place]);

        // this.setState({
        //   position: [1, 1]
        // })
    }

    const sortedPlaces = Places.sort(function (a, b) {
        if (a.city < b.city) { return -1; }
        if (a.city > b.city) { return 1; }
        return 0;
    })

    useEffect(() => {
        console.log(position);
        console.log(date);
        fetch(`http://history.openweathermap.org/data/2.5/history/city?lat=${position[0]}&lon=${position[1]}&type=hour&start=${date.getTime()}&end=${date.getTime()}&appid=${apiKey}`)

            .then(response => response.json())
            .then(data => console.log(data));
    }, [date, position])

    return (

        <div className="app">
            <header>
                {<MapWrapper position={position} onClick={handleChangePosition} />}
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
                    {<Forecast selectedPlaces={selectedPlaces} />}
                </section>
            </main>
            <footer>{<Footer />}</footer>
        </div>

    );
}

export default App;
