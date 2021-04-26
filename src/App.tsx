import React, { useEffect, useState } from 'react';
import './App.css';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet-maskcanvas';
import { Fog } from "./Fog";
import { Quest } from "./Quest";
import { Landmark } from "./Landmark";

const Map = () => {
    const messageHandler = (message: any) => {
        // console.log(message);
        const messageRN = JSON.parse(message.data);
        const payload = messageRN.payload;
        switch (messageRN.type) {
            case 'INITIAL':
                setFog(payload.fog);
                setQuests(Object.keys(payload.quests).map((id: string) =>
                    <Quest id={id} {...payload.quests[id]} />)
                );
                setLandmarks(Object.keys(payload.landmarks).map((id: string) =>
                    <Landmark id={id} {...payload.landmarks[id]} />)
                );
                break;
            case 'test':
                console.log(messageRN.payload);
                break;
            case 'UPDATE_FOG':
                setFog(payload);
                break;
            default:
                break;
        }
    };

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

    type LatLng = [number, number];

    const [fog, setFog] = useState<LatLng[]>([]);
    const [quests, setQuests] = useState<JSX.Element[]>([]);
    const [landmarks, setLandmarks] = useState<JSX.Element[]>([]);

    return (
        <MapContainer
            style={{height: '100vh'}}
            center={[59.986232, 30.299219]}
            zoom={10}
            minZoom={10}
            maxBounds={[[59.8220, 29.8404], [60.1372, 30.7505]]}
            scrollWheelZoom={true}
            zoomControl={false}
            attributionControl={false}
        >
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Fog fog={fog} setFog={setFog}/>
            {quests}
            {landmarks}
        </MapContainer>
    );
};

const App = () => {
    return <Map/>
};

export default App;
