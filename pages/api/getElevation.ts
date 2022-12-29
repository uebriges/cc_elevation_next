import { LatLng } from 'leaflet';
import type { NextApiRequest, NextApiResponse } from 'next';

type TElevationData = {
  elevation: number;
};

export default async function getElevation(
  req: NextApiRequest,
  res: NextApiResponse<TElevationData>,
) {
  // Set position and initial elevation values
  const position: LatLng = JSON.parse(req.body);
  let elevation: number = 0;

  // Build URL to for fetching elevation of the current position
  const url = `https://api.opentopodata.org/v1/test-dataset?locations=${position.lat},${position.lng}`;

  const response = await fetch(url);
  const result = await response.json();

  if (result.results) {
    elevation = result.results[0].elevation;
  }

  res.status(200).json({ elevation });
  res.end();
}
