import { useEffect } from 'react';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import Timeline from '../components/timeline';

export default function Dashboard() {
  useEffect(() => {
    document.title = 'RollandBox';
  }, []);

  return (
    <div className="bg-grey-background">
      <Header />
      <div className="grid">
        <Timeline />
        <Sidebar />
      </div>
    </div>
  );
}
