/* eslint-disable no-nested-ternary */
import Skeleton from 'react-loading-skeleton';
import useWatches from '../hooks/use-watches';

export default function Timeline() {
  const { watches } = useWatches();
  console.log('timeline-watches', watches);
  return (
    <div className="grid grid-cols-3 gap-4">
      {watches ? (
        <>
          {[...new Array(4)].map((_, index) => (
            <Skeleton className="mb-5 px-4" key={index} count={1} width={120} height={200} />
          ))}
        </>
      ) : watches?.length > 0 ? (
        watches.map((content) => <p key={content.docId}>{content.imageSrc}</p>)
      ) : (
        <p className="text-center text-2xl">You need to Follow others to see Watches</p>
      )}
    </div>
  );
}
