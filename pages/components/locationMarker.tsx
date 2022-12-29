import { LatLng } from 'leaflet';
import { useEffect, useState } from 'react';
import { Marker, Tooltip, useMapEvents } from 'react-leaflet';
import useElevation from '../hooks/useElevation';

export default function LocationMarker() {
  const [position, setPosition] = useState<LatLng | null>(null);
  const elevation = useElevation(position as LatLng);

  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position === null ? null : (
    <Marker position={[position.lat, position.lng]}>
      <Tooltip offset={[-15, -20]} permanent direction="top">
        {elevation ? (
          <div>
            {Intl.NumberFormat('de-DE', {
              style: 'unit',
              unit: 'meter',
            }).format(elevation)}
          </div>
        ) : (
          <div>No elevation available</div>
        )}
      </Tooltip>
    </Marker>
  );
}
