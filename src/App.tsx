import React, { useEffect, useState } from 'react';
import './App.css';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet-maskcanvas';
import { Fog } from "./Fog";
import { Quest } from "./Quest";
import { Landmark } from "./Landmark";

const Map = (props: any) => {
    const messageHandler = (message: any) => {
        console.log(message);
        const messageRN = JSON.parse(message.data);
        switch (messageRN.type) {
            case 'initial':
                const data = messageRN.data;
                setFog(data.fog);
                setQuests(data.quests.map((quest: any) => <Quest {...quest} />));
                setLandmarks(data.landmarks.map((landmark: any) => <Landmark {...landmark} />));
                break;
            case 'test':
                console.log(messageRN.data);
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

    const [fog, setFog] = useState([]);
    const [quests, setQuests] = useState([]);
    const [landmarks, setLandmarks] = useState([]);

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
