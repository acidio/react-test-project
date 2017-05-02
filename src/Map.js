import React from 'react';
import PropTypes from 'prop-types';
import './Map.css';

// React Google Maps
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import MarkerClusterer from 'react-google-maps/lib/addons/MarkerClusterer';
import mapsStyle from './mapsStyle.json';

const Map = withGoogleMap(props => (
    <GoogleMap
        defaultZoom={5}
        defaultCenter={{ lat: 37.9268676, lng: -97.91015625 }}
        defaultOptions={{ styles: mapsStyle }}
        options={{ mapTypeControl: false, streetViewControl: false }}
        >
        <MarkerClusterer
            averageCenter
            enableRetinaIcons
            gridSize={60}
            >
            {props.markers.map((marker, index) => {
                const { place, time, title, mag, status } = marker.properties;
                const longitude = marker.geometry.coordinates[0];
                const latitude = marker.geometry.coordinates[1];
                const date = new Date(time);

                return <Marker
                    position={{ lat: latitude, lng: longitude }}
                    key={marker.id}
                    icon={require('../public/earthquake-icon-32-v2.png')}
                    onClick={() => props.onMarkerClick(marker)}
                    >
                    {marker.showInfo && (
                        <InfoWindow onCloseClick={() => props.onMarkerClose(marker)}>
                            <ul className="info-list">
                                <li><strong>Title:</strong> {title}</li>
                                <li><strong>Place:</strong> {place}</li>
                                <li><strong>Date:</strong> {date.toDateString()}</li>
                                <li><strong>Magnitude:</strong> {mag}</li>
                                <li><strong>Status:</strong> {status}</li>
                            </ul>
                        </InfoWindow>
                    )}
                </Marker>
            })}
        </MarkerClusterer>
    </GoogleMap>
));

Map.propTypes = {
    markers: PropTypes.array.isRequired,
    onMarkerClick: PropTypes.func,
    onMarkerClose: PropTypes.func
}

export default Map;
