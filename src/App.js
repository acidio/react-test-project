import React, { Component } from 'react';
import './App.css';

// For API request
import request from 'superagent';

// Components
import Header from './Header';
import FilterBar from './FilterBar';
import Spinner from './Spinner';
import Map from './Map';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            markers: [],
            count: 0,
            metadata: {
                title: '',
            },
            filters: {
                status: ''
            },
            filtersOpen: false
        };

        this.updateInfo = this.updateInfo.bind(this);
        this.handleMarkerClick = this.handleMarkerClick.bind(this);
        this.handleMarkerClose = this.handleMarkerClose.bind(this);
    }

    updateInfo(data) {
        this.setState({
            loading: false,
            markers: data.features,
            count: data.features.length,
            originalMarkers: data.features,
            metadata: data.metadata
        });
    }

    applyFilter() {
        const { filters, originalMarkers } = this.state;
        const filteredMarkers = [];

        originalMarkers.map(marker => {
            const { status } = marker.properties;
            if (filters.status === '' || status === filters.status) {
                filteredMarkers.push(marker);
            }
            return false;
        });

        this.setState({
            markers: filteredMarkers,
            count: filteredMarkers.length
        });
    }

    onValueChange(e, filterName) {
        this.setState({
            filters: {
                ...this.state.filters,
                [filterName]: e.target.value
            }
        }, () => this.applyFilter());
    }

    componentDidMount() {
        request
            .get('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson')
            .end((err, res) => {
                this.updateInfo(res.body);
            });
    }

    handleMarkerClick(targetMarker) {
        this.setState({
            markers: this.state.markers.map(marker => {
                if (marker === targetMarker) {
                    return {
                        ...marker,
                        showInfo: true,
                    };
                }
                return marker;
            }),
        });
    }

    handleMarkerClose(targetMarker) {
        this.setState({
            markers: this.state.markers.map(marker => {
                if (marker === targetMarker) {
                    return {
                        ...marker,
                        showInfo: false,
                    };
                }
                return marker;
            }),
        });
    }

    toggleFilters() {
        this.setState({
            filtersOpen: !this.state.filtersOpen
        });
    }

    resetFilters(e) {
        e.preventDefault();
        this.setState({
            filters: {
                status: ''
            },
            filtersOpen: false
        }, () => this.applyFilter());
    }

    render() {
        const { loading, markers, count, metadata: { title }, filtersOpen, filters } = this.state;

        return (
            <div className="App">
                <Spinner loading={loading} />
                <Header show={!loading} title={title} />
                <FilterBar
                    show={filtersOpen}
                    filters={filters}
                    onValueChange={this.onValueChange.bind(this)}
                    toggleFilters={this.toggleFilters.bind(this)}
                    resetFilters={this.resetFilters.bind(this)}
                    numberOfItems={count}
                />
                <Map
                    containerElement={<div className="map-container" />}
                    mapElement={<div style={{ height: `100%` }} />}
                    markers={markers}
                    onMarkerClick={this.handleMarkerClick}
                    onMarkerClose={this.handleMarkerClose}
                />
            </div>
        );
    }
}

export default App;
