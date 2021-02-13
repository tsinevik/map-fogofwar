import React, {useEffect} from 'react';
import './App.css';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import {useLeafletContext} from '@react-leaflet/core';
import 'leaflet-maskcanvas';
import questIcon from './quest.png';
import landmarkIcon from './landmark.png';

const random = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
};

function MaskCanvas(props: any) {
    const context = useLeafletContext();

    useEffect(() => {
        // @ts-ignore
        const mask = L.TileLayer.maskCanvas({
            radius: 50,  // radius in pixels or in meters (see useAbsoluteRadius)
            useAbsoluteRadius: true,  // true: r in meters, false: r in pixels
            color: '#000',  // the color of the layer
            opacity: 0.5,  // opacity of the not covered area
            noMask: false,  // true results in normal (filled) circled, instead masked circles
            lineColor: '#A00'   // color of the circle outline if noMask is true
        });
        // @ts-ignore
        mask.setData(document.mapData.fog);
        const container = context.layerContainer || context.map;
        container.addLayer(mask);

        return () => {
            container.removeLayer(mask);
        }
    })

    return null;
}

function Quest(props: any) {
    const quest = L.icon({
        iconUrl: questIcon,
    });
    return <Marker position={props.latlng} icon={quest}>
        <Popup>
            <div>
                <img src={questIcon} width='150' height='150'/>
                <div>
                    <h1>YOOOOOOO</h1>
                    <span>30 min</span>
                    <span>30 min</span>
                    <span>30 min</span>
                </div>
                <button>start</button>
                <button>more</button>
            </div>
        </Popup>
    </Marker>
}

function Landmark(props: any) {
    const landmark = L.icon({
        iconUrl: landmarkIcon,
    });
    return <Marker position={props.latlng} icon={landmark}/>
}

function Map(props: any) {
    const quests = props.quests.map((quest: any) => <Quest {...quest} />);
    const landmarks = props.landmarks.map((landmark: any) => <Landmark {...landmark} />);

    return (
        <MapContainer
            style={{height: '100vh'}}
            center={[59.986232, 30.299219]}
            zoom={10}
            maxBounds={[[59.8220, 29.8404], [60.1372, 30.7505]]}
            scrollWheelZoom={true}
            zoomControl={false}
        >
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MaskCanvas/>
            {quests}
            {landmarks}
        </MapContainer>
    );
}

function App() {
    // @ts-ignore
    const data = document.mapData;
    return <Map {...data} />
}

export default App;
