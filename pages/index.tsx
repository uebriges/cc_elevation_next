import { Inter } from '@next/font/google';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [currentElevation, setCurrentElevantion] = useState<number>();

  const MapWithNoSSR = dynamic(() => import('./Map'), {
    ssr: false,
  });

  return <MapWithNoSSR />;
}
