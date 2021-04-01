import Skeleton from 'react-loading-skeleton';
import useWatches from '../hooks/use-watches';

export default function Timeline() {
  const { watches } = useWatches();
  return (
    <div className="container col-span-2">
      <p>Timeline</p>
    </div>
  );
}
