import L from 'leaflet';
import { createControlComponent } from '@react-leaflet/core';

const createGeolocationLayer = (props: any) => {
    const geolocationConfig = {
        position: 'bottomright',
        flyTo: true,
        clickBehavior: {
            inView: 'setView',
            outOfView: 'inView',
            inViewNotFollowing: 'inView',
        },
    };
    // @ts-ignore
    const instance = L.control.locate(geolocationConfig);
    // lc.start();

    return instance;
};

const Geolocation = createControlComponent(createGeolocationLayer);

export default Geolocation;
