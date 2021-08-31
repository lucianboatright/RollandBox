import { useEffect } from 'react';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import Timeline from '../components/timeline';
import UserContext from '../context/user';

export default function Dashboard() {
  useEffect(() => {
    document.title = 'RollandBox';
  }, []);

  return (
    <div className="bg-grey-background">
      <Header />
      <div>
        <div className="grid grid-cols-5 gap-4 justify-between mx-auto ml-10 mr-10">
          <Timeline />
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
