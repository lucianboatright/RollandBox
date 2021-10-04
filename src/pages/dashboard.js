import { useEffect } from 'react';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import Timeline from '../components/timeline';
import BottomBanner from '../components/bottomBanner';

export default function Dashboard() {
  useEffect(() => {
    document.title = 'RollandBox';
  }, []);

  return (
    <div className="bg-grey-background">
      <Header />
      <div>
        <div className="grid grid-cols-6 gap-4 justify-between mx-auto ml-3 mr-24 sm:ml-10 mr-10 md:ml-10 lg:ml-10 xl:ml-10">
          <Timeline />
          <Sidebar />
        </div>
      </div>
      <BottomBanner />
    </div>
  );
}
