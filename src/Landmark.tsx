import L from 'leaflet';
import landmarkIcon from './landmark.png';
import { Marker, Popup } from 'react-leaflet';
import React from 'react';
import questIcon from './quest.png';
import { sendMessage } from './message-service';

export const Landmark = (props: any) => {
  const landmark = L.icon({
    iconUrl: landmarkIcon,
  });
  return (
    <Marker position={props.latlng} icon={landmark}>
      <Popup>
        <div>
          <img alt="something" src={questIcon} width="150" height="150" />
          <div>
            <h1>{props.name}</h1>
            <span>{props.isVisited.toString()}</span>
            <span>30 min</span>
            <span>30 min</span>
          </div>
          <button onClick={() => sendMessage('VISIT_LANDMARK', props.id)}>
            Отметить
          </button>
          <button onClick={() => sendMessage('OPEN_LANDMARK', props.id)}>
            Подробнее
          </button>
        </div>
      </Popup>
    </Marker>
  );
};
