import { Inter } from '@next/font/google';
import { LatLng } from 'leaflet';
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import LocationMarker from './components/locationMarker';

const inter = Inter({ subsets: ['latin'] });

export default function Map() {
  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: '50vh', width: '50vw' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        eventHandlers={{
          click: () => {
            console.log('marker clicked');
          },
        }}
      />
      <MyComponent />
    </MapContainer>
  );
}

function MyComponent() {
  const [position, setPosition] = useState<LatLng | null>(null);
  const [currentElevation, setCurrentElevation] = useState<number>();

  const map = useMapEvents({
    click(e) {
      console.log('click: ', e.latlng);
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());

      // map.setView(map.getCenter());
    },
  });

  useEffect(() => {
    console.log('new position: ', position);
    async function fetchData() {
      const response = await fetch('/api/getElevation', {
        method: 'POST',
        body: JSON.stringify(position),
      });
      const result = await response.json();
      setCurrentElevation(result.elevation);
    }
    fetchData();
  }, [position, currentElevation]);

  return <LocationMarker position={position} elevation={currentElevation} />;
}
