import { useEffect } from 'react';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import Timeline from '../components/timeline';
import backGrid from '../images/borders/wooden_grid_3_long.png';

export default function Dashboard() {
  useEffect(() => {
    document.title = 'RollandBox';
  }, []);

  return (
    <div className="bg-grey-background">
      <Header />
      {/* <img className="" height={170} src={backGrid} alt="" /> */}
      <div>
        <div className="grid grid-cols-4 gap-4 justify-between mx-auto ">
          <Timeline />
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
