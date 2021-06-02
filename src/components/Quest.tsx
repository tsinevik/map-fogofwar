import L from 'leaflet';
import questIcon from '../assets/icons/quest.svg';
import address from '../assets/icons/map-marker-alt.svg';
import duration from '../assets/icons/clock.svg';
import length from '../assets/icons/shoe-prints.svg';
import experience from '../assets/icons/graduation-cap.svg';
import route from '../assets/icons/directions.svg';
import { Marker, Popup } from 'react-leaflet';
import React from 'react';
import { sendMessage } from '../api/message-service';

export const Quest = (props: any) => {
  const quest = L.icon({
    iconUrl: questIcon,
    iconSize: [44, 44],
    popupAnchor: [0, -15],
  });
  return (
    <Marker position={props.latlng} icon={quest}>
      <Popup className="popup" keepInView>
        <h1 className="popup__title">{props.title}</h1>
        <div className="popup__stats">
          <img className="popup__icon" src={address} alt="Адрес" />
          <span>30 минfadfdsafdsa</span>
        </div>
        <div className="popup__flex">
          <div className="popup__stats">
            <img className="popup__icon" src={duration} alt="Длительность" />
            <span>30 мин</span>
          </div>
          <div className="popup__stats">
            <img className="popup__icon" src={length} alt="Расстояние" />
            <span>30 км</span>
          </div>
          <div className="popup__stats">
            <img className="popup__icon" src={experience} alt="Очки опыта" />
            <span>30</span>
          </div>
        </div>
        <div className="popup__flex popup__buttons">
          <button
              className="popup__button"
              onClick={() => sendMessage('OPEN_QUEST', props.id)}>
            Подробнее
          </button>
          <button className="popup__button popup__button_secondary">
            <img className="popup__icon-button" src={route} alt="Построить маршрут"/>
          </button>
        </div>
      </Popup>
    </Marker>
  );
};
