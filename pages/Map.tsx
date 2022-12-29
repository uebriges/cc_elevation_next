import { MapContainer, TileLayer } from 'react-leaflet';
import LocationMarker from './components/LocationMarker';

export default function Map() {
  return (
    <MapContainer
      center={[48.20849, 16.37208]}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: '100vh', width: '100vw' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker />
    </MapContainer>
  );
}
