import L from 'leaflet';
import { createControlComponent } from '@react-leaflet/core';
import { LatLng } from '../types/types';

const createRoutineMachineLayer = ({
  start = [0, 0],
  waypoint = [0, 0],
}: {
  start: LatLng;
  waypoint: LatLng;
}) => {
  // @ts-ignore
  const instance = L.Routing.control({
    // @ts-ignore
    plan: new L.Routing.Plan([L.latLng(...start), L.latLng(...waypoint)], {
      addWaypoints: false,
      draggableWaypoints: false,
      createMarker: () => null,
    }),
    // @ts-ignore
    router: L.Routing.mapbox(
      'pk.eyJ1IjoidHNpbmV2aWsiLCJhIjoiY2twNXhtb3pqMDIxaDJua2thbjdiMmY5MSJ9.Qs_1ub95ChmNF3ZsYSaI-Q',
    ),
    lineOptions: { addWaypoints: false },
  });

  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;
