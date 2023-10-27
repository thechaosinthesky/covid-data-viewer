import * as React from 'react';
import {useRef} from 'react';
import {Map, Marker} from 'react-map-gl';
import type {MapRef} from 'react-map-gl';
import { Box, Chip, Typography } from '@mui/material';
import stateCoords from '../data/state-coordinates.json';

function addMarker(stateData: any) {
    const stateLatLong = stateCoords.find(stateObj => {return stateObj.state === stateData.name})
    const lat = stateLatLong ? stateLatLong.latitude : 0;
    const long = stateLatLong ? stateLatLong.longitude : 0;
    return (
        <Marker
            latitude={lat}
            longitude={long}
        >
            <Chip label={stateData.cases} sx={{backgroundColor: "#ff00ff", color: "#fff"}} />
        </Marker>
    )
}

interface CaseDataProps {
    caseData: any[],
}

export default function MapDisplay(props: CaseDataProps) {
    const {caseData} = props;
    const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;
    const mapRef = useRef<MapRef>(null);

    const onClick = (event: any) => {
        // Hanlde map click
    };

    if (!MAPBOX_TOKEN) {
        return (
            <Typography>Please add your REACT_APP_MAPBOX_TOKEN env variable.</Typography>
        )
    }

    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <Map
            initialViewState={{
            latitude: 40.67,
            longitude: -103.59,
            zoom: 3
            }}
                mapStyle="mapbox://styles/mapbox/dark-v9"
                mapboxAccessToken={MAPBOX_TOKEN}
                onClick={onClick}
                ref={mapRef}
            >
                {caseData.map(item => addMarker(item))}
            </Map>
        </Box>
  );
}