// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  elevation: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const position = JSON.parse(req.body);
  let elevation: number = 0;

  console.log();

  const response = await fetch(
    `https://api.opentopodata.org/v1/test-dataset?locations=${position?.lat},${position?.lng}
  `,
    {
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:5173',
      },
    },
  );
  const result = await response.json();

  if (result) {
    elevation = result.results[0].elevation;
  }

  console.log('elevation: ', elevation);

  res.status(200).json({ elevation });
  res.end();
}
