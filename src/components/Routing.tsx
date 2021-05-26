import L from 'leaflet';
import { createControlComponent } from '@react-leaflet/core';

const createRoutineMachineLayer = (props: any) => {
  // @ts-ignore
  const instance = L.Routing.control({
    // @ts-ignore
    plan: new L.Routing.Plan(
      [L.latLng(59.954071, 30.301731), L.latLng(59.935814, 30.322331)],
      {
        addWaypoints: false,
        draggableWaypoints: false,
        createMarker: () => null,
      },
    ),
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
