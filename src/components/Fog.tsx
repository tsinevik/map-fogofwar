import { useLeafletContext, createLayerComponent } from '@react-leaflet/core';
import { useEffect, useRef } from 'react';
import L from 'leaflet';

const createFog = (props: any, context: any) => {
  // @ts-ignore
  const instance = L.TileLayer.maskCanvas({
    radius: 50, // radius in pixels or in meters (see useAbsoluteRadius)
    useAbsoluteRadius: true, // true: r in meters, false: r in pixels
    color: '#000', // the color of the layer
    opacity: 0.5, // opacity of the not covered area
    noMask: false, // true results in normal (filled) circled, instead masked circles
    lineColor: '#A00', // color of the circle outline if noMask is true
  });

  return { instance, context };
};

const updateFog = (instance: any, props: any, prevProps: any) => {
  if (props.fog.length > prevProps.fog.length) {
    instance.setData(props.fog);
  }
};

const Fog = createLayerComponent(createFog, updateFog);

export default Fog;

// // @ts-ignore
// export const Fog = ({ fog }) => {
//   const context = useLeafletContext();
//
//   //todo set type
//   const maskRef = useRef<any>();
//
//   useEffect(() => {
//     // @ts-ignore
//     maskRef.current = L.TileLayer.maskCanvas({
//       radius: 50, // radius in pixels or in meters (see useAbsoluteRadius)
//       useAbsoluteRadius: true, // true: r in meters, false: r in pixels
//       color: '#000', // the color of the layer
//       opacity: 0.5, // opacity of the not covered area
//       noMask: false, // true results in normal (filled) circled, instead masked circles
//       lineColor: '#A00', // color of the circle outline if noMask is true
//     });
//     const container = context.layerContainer || context.map;
//     container.addLayer(maskRef.current);
//
//     return () => {
//       container.removeLayer(maskRef.current);
//     };
//   }, [context.layerContainer, context.map]);
//
//   useEffect(() => {
//     maskRef.current.setData(fog);
//   }, [fog]);
//
//   return null;
// };
