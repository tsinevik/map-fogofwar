import L from 'leaflet';
import landmarkIcon from '../assets/icons/landmark.svg';
import { Marker, Popup } from 'react-leaflet';
import React from 'react';
import { sendMessage } from '../api/message-service';

export const Landmark = (props: any) => {
  const landmark = L.icon({
    iconUrl: landmarkIcon,
    iconSize: [44, 44],
  });
  return (
    <Marker position={props.latlng} icon={landmark}>
      <Popup>
        <div>
          {/*<img alt="something" src={landmark} width="150" height="150" />*/}
          <div>
            <h1>{props.name}</h1>
            <span>{props.visited.toString()}</span>
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
