import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import useUser from '../../hooks/use-user';
import { isUserFollowingProfile, toggleFollow } from '../../services/firebase';
import ModalNewWatch from '../newWatch/ModalNewWatch';
// import ModalNewWatch from '../newWatch/ModalNewWatch_easycrop';
// import ModalNewWatch from '../newWatch/ModalNewWatchTest';
import ModalAvitar from '../newWatch/ModalAvitar';

export default function Header({
  watchesCount,
  followerCount,
  setFollowerCount,
  profile: {
    docId: profileDocId,
    userId: profileUserId,
    fullName,
    following = [],
    followers = [],
    username: profileUsername
  }
}) {
  const { user } = useUser();
  const [isFollowingProfile, setIsFollowingProfile] = useState(false);
  const activeButtonFollow = user.username && user.username !== profileUsername;
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenAvitar, setIsOpenAvitar] = useState(false);
  const editProfile = user.username && user.username === profileUsername;

  const handleToggleFollow = async () => {
    setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile);
    setFollowerCount({
      followerCount: isFollowingProfile ? followerCount - 1 : followerCount + 1
    });
    await toggleFollow(isFollowingProfile, user.docId, profileDocId, profileUserId, user.userId);
  };

  useEffect(() => {
    const isLoggedInUserFollowingProfile = async () => {
      const isFollowing = await isUserFollowingProfile(user.username, profileUserId);
      setIsFollowingProfile(isFollowing);
    };
    if (user.username && profileUserId) {
      isLoggedInUserFollowingProfile();
    }
  }, [user.username, profileUserId]);
  return (
    <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg pb-2">
      <div className="container flex justify-center">
        {user.username && (
          <img
            className="rounded-full h-40 w-auto flex"
            src={`./images/avatars/${profileUsername}.jpg`}
            alt={`/images/avatars/${profileUsername}.jpg`}
          />
        )}
      </div>
      <div className="flex items-center justify-center flex-col col-span">
        <div className="container flex item-center">
          <p className="text-2xl mr-4">{profileUsername}</p>
          {activeButtonFollow && (
            <button
              className="bg-green-600 font-bold text-sm rounded text-white w-20 h-8"
              type="button"
              onClick={handleToggleFollow}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  handleToggleFollow();
                }
              }}
            >
              {isFollowingProfile ? 'Unfollow' : 'Follow'}
            </button>
          )}
        </div>
        <div className="container flex mt-4">
          {followers === undefined || following === undefined ? (
            <Skeleton count={1} width={677} height={24} />
          ) : (
            <>
              <p className="mr-10">
                <span className="font=bold">{watchesCount}</span>
                {`  `}
                Watches
              </p>
              <p className="mr-10">
                <span className="font-bold">{followerCount}</span>
                {`  `}
                {followerCount === 1 ? `Follower` : `Followers`}
              </p>
              <p className="mr-10">
                <span className="font-bold">{following?.length}</span>
                {`  `}
                Following
              </p>
              {editProfile && (
                <div>
                  <div className="flex items-center justify-evenly flex-col col-span">
                    <div className="container mr-2">
                      <button
                        className="bg-green-400 font-bold text-sm  rounded text-white pr-5 pl-5 h-10"
                        type="button"
                        onClick={() => setIsOpenAvitar(true)}
                      >
                        Change Avitar
                      </button>
                      <ModalAvitar
                        profile={profileUsername}
                        open={isOpenAvitar}
                        onClose={() => setIsOpenAvitar(false)}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-evenly flex-col col-span">
                    <div className="container mr-2">
                      <button
                        className="bg-pink-600 font-bold text-sm  rounded text-white pr-5 pl-5 h-10"
                        type="button"
                        onClick={() => setIsOpen(true)}
                      >
                        New Watch
                      </button>
                      <ModalNewWatch
                        profile={profileUsername}
                        watchesCount={watchesCount}
                        userId={profileUserId}
                        open={isOpen}
                        onClose={() => setIsOpen(false)}
                      />
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        <div className="container mt-4">
          <p className="font-medium">{!fullName ? <Skeleton count={1} height={24} /> : fullName}</p>
        </div>
      </div>
    </div>
  );
}

Header.propTypes = {
  watchesCount: PropTypes.number.isRequired,
  followerCount: PropTypes.number.isRequired,
  setFollowerCount: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    docId: PropTypes.string,
    userId: PropTypes.string,
    fullName: PropTypes.string,
    username: PropTypes.string,
    followers: PropTypes.array,
    following: PropTypes.array
  }).isRequired
};
