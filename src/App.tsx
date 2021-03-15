import React, {useEffect, useState} from 'react';
import './App.css';
import 'leaflet/dist/leaflet.css';
import {MapContainer, TileLayer} from 'react-leaflet';
import 'leaflet-maskcanvas';
import {Fog} from "./Fog";
import {Quest} from "./Quest";
import {Landmark} from "./Landmark";

// @ts-ignore
window.mapData = {
    quests: [
        { latlng: [59.954353, 30.322607] },
        { latlng: [59.939397, 30.321887] },
    ],
    landmarks: [
        { latlng: [59.962453, 30.322507] },
        { latlng: [59.922697, 30.321387] },
    ],
    fog: [
        [59.954453, 30.322507],
        [59.939697, 30.321387],
        [59.954353, 30.322607],
        [59.939397, 30.321887],
    ],
};

// @ts-ignore
const fogData = window.mapData;

const messageHandler = (message: any) => {
    console.log(message);
};

setTimeout(() => {
    // @ts-ignore
    window.ReactNativeWebView.postMessage("RN GOT MESSAGE!");
}, 4000);

const Map = (props: any) => {
    useEffect(() => {
        const isUIWebView = () => {
            return navigator.userAgent.toLowerCase().match(/\(ip.*applewebkit(?!.*(version|crios))/);
        };

        const receiver = isUIWebView() ? window : document;
        receiver.addEventListener('message', messageHandler);

        return () => {
            receiver.removeEventListener('message', messageHandler);
        }
    });

    const [fog, setFog] = useState(fogData.fog);
    const quests = fogData.quests.map((quest: any) => <Quest {...quest} />);
    const landmarks = fogData.landmarks.map((landmark: any) => <Landmark {...landmark} />);

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
            <Fog fog={fog} />
            {quests}
            {landmarks}
        </MapContainer>
    );
};

const App = () => {
    return <Map />
};

export default App;
