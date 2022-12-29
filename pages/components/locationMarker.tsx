import { LatLng } from 'leaflet';
import { useState } from 'react';
import { Marker, Tooltip, useMapEvents } from 'react-leaflet';
import useElevation from '../hooks/useElevation';

export default function LocationMarker() {
  console.log('marker drawn');
  const [position, setPosition] = useState<LatLng | null>(null);
  const elevation = useElevation(position as LatLng);

  const map = useMapEvents({
    click(e) {
      console.log('click: ', e.latlng);
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  console.log('current elevation: ', elevation);

  return position === null ? null : (
    <Marker position={[position.lat, position.lng]}>
      <Tooltip permanent direction="top">
        {elevation ? elevation : <div>nope</div>}
      </Tooltip>
    </Marker>
  );
}
