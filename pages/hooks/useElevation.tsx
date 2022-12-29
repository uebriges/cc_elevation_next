import { LatLng } from 'leaflet';
import { useEffect, useState } from 'react';

export default function useElevation(position: LatLng | null) {
  const [elevation, setElevation] = useState<number>(0);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/getElevation', {
        method: 'POST',
        body: JSON.stringify(position),
      });
      const result = await response.json();
      setElevation(result.elevation);
    }
    if (position) {
      fetchData();
    }
  });

  return elevation;
}
