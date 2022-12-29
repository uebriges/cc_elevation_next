import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  elevation: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  // Set position and initial elevation values
  const position = JSON.parse(req.body);
  let elevation: number = 0;

  // Build URL to for fetching elevation of the current position
  const url = `https://api.opentopodata.org/v1/test-dataset?locations=${position?.lat},${position?.lng}`;

  const response = await fetch(url);
  const result = await response.json();

  if (result) {
    elevation = result.results[0].elevation;
  }

  res.status(200).json({ elevation });
  res.end();
}
