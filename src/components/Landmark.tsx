import L from 'leaflet';
import landmarkIcon from '../assets/icons/landmark.svg';
import { Marker, Popup } from 'react-leaflet';
import React from 'react';
import { sendMessage } from '../api/message-service';
import address from "../assets/icons/map-marker-alt.svg";
import route from "../assets/icons/directions.svg";

export const Landmark = (props: any) => {
  const landmark = L.icon({
    iconUrl: landmarkIcon,
    iconSize: [44, 44],
  });
  return (
    <Marker position={props.latlng} icon={landmark}>
      <Popup>
        <div className="popup">
          <div>
            <h1 className="popup__title">{props.name}</h1>
          </div>
          <div className="popup__stats">
            <img className="popup__icon" src={address} alt="Адрес" />
            30 минfadfdsafdsa
          </div>
          <div className="popup__flex">
            <button
                className="popup__button"
                onClick={() => sendMessage('VISIT_LANDMARK', props.id)}>
              Отметить
            </button>
          </div>
          <div className="popup__flex popup__buttons">
            <button
                className="popup__button"
                onClick={() => sendMessage('OPEN_LANDMARK', props.id)}>
              Подробнее
            </button>
            <button className="popup__button popup__button_secondary">
              <img className="popup__icon-button" src={route} alt="Построить маршрут"/>
            </button>
          </div>
        </div>
      </Popup>
    </Marker>
  );
};
