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
      <div
        className="alight-center"
        height={200}
        width={100}
        style={{
          backgroundImage: `url(${backGrid})`,
          height: '200vh',
          width: '150vh',
          backgroundPosition: '',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* <img className="" height={170} src={backGrid} alt="" /> */}
        <div className="grid grid-cols-4 gap-4 justify-between mx-auto max-w-screen-lg">
          <Timeline />
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
