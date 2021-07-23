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
        <div className="grid grid-cols-4 gap-4 justify-between mx-auto ml-10 mr-10">
          <UserContext.Comsumer> {(user) => <Timeline user={user} />}</UserContext.Comsumer>
          <UserContext.Comsumer>{(user) => <Sidebar user={user} />}</UserContext.Comsumer>
        </div>
      </div>
    </div>
  );
}
