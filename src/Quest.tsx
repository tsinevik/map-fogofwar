import L from "leaflet";
import questIcon from "./quest.png";
import { Marker, Popup } from "react-leaflet";
import React from "react";
import { sendMessage } from "./message-service";

export const Quest = (props: any) => {
    const quest = L.icon({
        iconUrl: questIcon,
    });
    return (
        <Marker position={props.latlng} icon={quest}>
            <Popup>
                <div>
                    <img alt='something' src={questIcon} width='150' height='150'/>
                    <div>
                        <h1>YOOOOOOO</h1>
                        <span>30 min</span>
                        <span>30 min</span>
                        <span>30 min</span>
                    </div>
                    <button>start</button>
                    <button onClick={() => sendMessage('OPEN_QUEST', props.id)}>more</button>
                </div>
            </Popup>
        </Marker>
    )
};
