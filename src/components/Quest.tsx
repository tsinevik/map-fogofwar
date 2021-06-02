import L from 'leaflet';
import questIcon from '../assets/icons/quest.svg';
import { Marker, Popup } from 'react-leaflet';
import React from 'react';
import { sendMessage } from '../api/message-service';

export const Quest = (props: any) => {
  const quest = L.icon({
    iconUrl: questIcon,
    iconSize: [44, 44],
  });
  return (
    <Marker position={props.latlng} icon={quest}>
      <Popup>
        <div>
          {/*<img alt="something" src={questIcon} width="150" height="150" />*/}
          <div>
            <h1>{props.title}</h1>
            <span>30 min</span>
            <span>30 min</span>
            <span>30 min</span>
          </div>
          <button>start</button>
          <button onClick={() => sendMessage('OPEN_QUEST', props.id)}>
            more
          </button>
        </div>
      </Popup>
    </Marker>
  );
};
