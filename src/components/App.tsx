import React, { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import '../styles/Popup.css';
import 'react-leaflet-markercluster/dist/styles.min.css';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet-maskcanvas';
import 'leaflet-edgebuffer';
import 'leaflet.locatecontrol';
import 'leaflet-routing-machine';
import { Quest } from './Quest';
import { Landmark } from './Landmark';
import { LandmarkState, LatLng, QuestState } from '../types/types';
import Fog from './Fog';
import RoutingMachine from './Routing';
import Geolocation from './Geolocation';
// @ts-ignore
import MarkerClusterGroup from 'react-leaflet-markercluster';

const Map = () => {
  const messageHandler = (message: any) => {
    const messageRN = JSON.parse(message.data);
    const payload = messageRN.payload;
    switch (messageRN.type) {
      case 'INITIAL':
        setFog(payload.fog);
        setQuests(payload.quests);
        setLandmarks(payload.landmarks);
        break;
      case 'test':
        console.log(messageRN.payload);
        break;
      case 'UPDATE_FOG':
        setFog(payload);
        break;
      case 'VISIT_LANDMARK':
        setLandmarks((prevState) => ({
          ...prevState,
          [payload]: { ...prevState[payload], visited: true },
        }));
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    //todo информация об ОС передается GET-запросом
    const isUIWebView = () => {
      return navigator.userAgent
        .toLowerCase()
        .match(/\(ip.*applewebkit(?!.*(version|crios))/);
    };

    const receiver = isUIWebView() ? window : document;
    receiver.addEventListener('message', messageHandler);

    return () => {
      receiver.removeEventListener('message', messageHandler);
    };
  });

  const [fog, setFog] = useState<LatLng[]>([]);
  const [quests, setQuests] = useState<QuestState>({});
  const [landmarks, setLandmarks] = useState<LandmarkState>({});

  return (
    <MapContainer
      tap={false}
      style={{ height: '100vh' }}
      center={[59.986232, 30.299219]}
      zoom={10}
      minZoom={10}
      maxBounds={[
        [59.822, 29.8404],
        [60.1372, 30.7505],
      ]}
      maxBoundsViscosity={1}
      scrollWheelZoom={true}
      zoomControl={false}
      attributionControl={false}>
      <TileLayer
        minZoom={10}
        minNativeZoom={10}
        // @ts-ignore
        edgeBufferTiles={4}
        // detectRetina
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Fog fog={fog} />
      <RoutingMachine />
      <Geolocation />
      <MarkerClusterGroup>
      {Object.keys(quests).map((id: string) => (
        <Quest id={id} {...quests[id]} />
      ))}
      {Object.keys(landmarks).map((id: string) => (
        <Landmark id={id} {...landmarks[id]} />
      ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
};

const App = () => {
  return <Map />;
};

export default App;
