import React, { Component } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet'

import 'leaflet/dist/leaflet.css';
import '../styles/Map.css';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;


class MapWrapper extends Component {
    // state = {
    //     position: this.props.position
    // }

    // changePosition = () => {
    //     this.setState({
    //         position: [1, 1]
    //     })
    // }


    render() {
        return (
            <div className={'map'}>
                <MapContainer center={this.props.position} zoom={this.props.zoom} scrollWheelZoom={true}>
                    <MapEventsComponent onClick={this.props.onClick} onZoom={this.props.onZoom} onDrag={this.props.onDrag} />
                    <ChangeView center={this.props.position} zoom={this.props.zoom} />
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />


                    {this.props.selectedPlaces.map(selectedPlace =>
                        <Marker key={selectedPlace.id} position={[selectedPlace.lat, selectedPlace.lng]}>
                            <Popup>
                                {`${selectedPlace.city}  ${selectedPlace.country.toUpperCase()}`}

                            </Popup>
                        </Marker>
                    )}

                </MapContainer>
            </div>
        );
    }
}


const MapEventsComponent = ({ onClick, onZoom, onDrag }) => {
    const map = useMapEvents({
        click: (e) => {
            let data = [e.latlng.lat, e.latlng.lng];
            onClick(data)
        },
        zoom: (e) => {
            onZoom(map.getZoom())

        },
        drag: (e) => {
            onDrag(map.getCenter());
        }
    })
    return null
}

function ChangeView({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
}


export default MapWrapper;