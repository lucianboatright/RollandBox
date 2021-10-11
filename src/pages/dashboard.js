import { useEffect } from 'react';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import Timeline from '../components/timeline';
import BottomBanner from '../components/bottomBanner';

export default function Dashboard() {
  const refresh = window.localStorage.getItem('refresh');
  console.log(refresh);
  if (refresh === null) {
    window.location.reload();
    window.localStorage.setItem('refresh', '1');
  }
  useEffect(() => {
    document.title = 'RollandBox';
  }, []);

  return (
    <div className="bg-grey-background">
      <Header />
      <div>
        <div
          style={{ display: 'grid', gridTemplateColumns: '80% 20%' }}
          className="mx-auto ml-3 mr-24 sm:ml-10 mr-10 md:ml-10 lg:ml-10 xl:ml-10"
        >
          <div>
            <Timeline />
          </div>
          <div>
            <Sidebar />
          </div>
        </div>
      </div>
      <BottomBanner />
    </div>
  );
}
