import { Inter } from '@next/font/google';
import dynamic from 'next/dynamic';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const MapWithNoSSR = dynamic(() => import('./Map'), {
    ssr: false,
  });

  return (
    <div className={inter.className}>
      <MapWithNoSSR />
    </div>
  );
}
