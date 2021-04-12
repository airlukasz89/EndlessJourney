import React, { Component, useEffect } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet'

import 'leaflet/dist/leaflet.css';
import '../styles/Map.css';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconAnchor: [12, 20]
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
                <MapContainer center={this.props.viewPosition.position} zoom={this.props.viewPosition.zoom} scrollWheelZoom={true}>
                    <MapEventsComponent onZoom={this.props.onZoom} onDrag={this.props.onDrag} />
                    <ChangeView center={this.props.viewPosition.position} zoom={this.props.viewPosition.zoom} selectedPlaces={this.props.selectedPlaces} />
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


const MapEventsComponent = ({ onZoom, onDrag }) => {
    const map = useMapEvents({
        zoom: (e) => {
            onZoom(map.getZoom(), map.getCenter())

        },
        drag: (e) => {
            onDrag(map.getCenter());
        }
    })
    return null
}

function ChangeView({ center, zoom, selectedPlaces }) {
    const map = useMap();

    useEffect(() => {
        //TODO move it to App.js chyba..?
        // var latlngs = selectedPlaces.map(selectedPlace => [selectedPlace.lat, selectedPlace.lng]);

        // var polyline;
        // var arrowPolyline;

        // if (latlngs.length > 1) {
        //     polyline = L.polyline(latlngs, { color: '#033dfc' }).addTo(map);
        //     arrowPolyline = L.polyline
        //     map.fitBounds(polyline.getBounds());
        // }

        // var latlng = [
        //     [52.5, 16.8],
        //     [30.6, 40.15]
        // ]

        var polylines = []


        function createArrowPolyline(current, next) {
            var latlngs = [
                [
                    current.lat, current.lng
                ],
                [
                    next.lat, next.lng
                ]
            ]

            return L.polyline(latlngs, { color: '#033dfc' })
        }

        function pairwise(arr, func) {
            for (var i = 0; i < arr.length - 1; i++) {
                func(arr[i], arr[i + 1])
            }
        }
        pairwise(selectedPlaces, (current, next) => {
            polylines.push(createArrowPolyline(current, next))
        })

        polylines.map(polyline => polyline.addTo(map));


        return () => {
            polylines.map(polyline => map.removeLayer(polyline));
        }
    }, [selectedPlaces])

    map.setView(center, zoom);
    return null;
}


export default MapWrapper;