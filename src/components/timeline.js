/* eslint-disable no-nested-ternary */
import Skeleton from 'react-loading-skeleton';
import useWatches from '../hooks/use-watches';

export default function Timeline() {
  const { watches } = useWatches();
  console.log('timeline-watches', watches);
  return (
    <div className="container col-span-2 space-x-10 space-y-10">
      {watches ? (
        <>
          {[...new Array(6)].map((_, index) => (
            <Skeleton className="" key={index} count={1} width={220} height={170} />
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
