import { LatLng } from 'leaflet';
import { Marker, Tooltip } from 'react-leaflet';

export default function LocationMarker(props: {
  position: LatLng;
  elevation: number;
}) {
  const position = props.position;
  const elevation = props.elevation;

  return position === null ? null : (
    <Marker position={[props.position.lat, props.position.lng]}>
      <Tooltip permanent direction="top">
        {elevation}
      </Tooltip>
    </Marker>
  );
}
