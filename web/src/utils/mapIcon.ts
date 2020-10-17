import Leaflet from 'leaflet';

import mapMarkerImg from '../images/map-marker.svg';

const happyMapIcon = Leaflet.icon({
    iconUrl: mapMarkerImg,
  
    iconSize: [30, 35],
    iconAnchor: [15, 35],
    popupAnchor: [0, -25]
  })

export default happyMapIcon;