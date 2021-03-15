import L from "leaflet";
import landmarkIcon from "./landmark.png";
import {Marker} from "react-leaflet";
import React from "react";

export const Landmark = (props: any) => {
    const landmark = L.icon({
        iconUrl: landmarkIcon,
    });
    return <Marker position={props.latlng} icon={landmark}/>
};
