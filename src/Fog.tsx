import { useLeafletContext } from "@react-leaflet/core";
import { useEffect } from "react";
import L from "leaflet";
import { useMapEvent } from "react-leaflet";

// @ts-ignore
export const Fog = ({fog, setFog}) => {
    const context = useLeafletContext();
    useMapEvent('click', (e) => {
        const { lat, lng } = e.latlng;
        setFog([...fog, [lat, lng]]);
    });

    useEffect(() => {
        // @ts-ignore
        const mask = L.TileLayer.maskCanvas({
            radius: 50,  // radius in pixels or in meters (see useAbsoluteRadius)
            useAbsoluteRadius: true,  // true: r in meters, false: r in pixels
            color: '#000',  // the color of the layer
            opacity: 0.5,  // opacity of the not covered area
            noMask: false,  // true results in normal (filled) circled, instead masked circles
            lineColor: '#A00'   // color of the circle outline if noMask is true
        });
        mask.setData(fog);
        const container = context.layerContainer || context.map;
        container.addLayer(mask);

        return () => {
            container.removeLayer(mask);
        }
    }, [fog])

    return null;
};
