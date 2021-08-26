import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import useUser from '../../hooks/use-user';
import { isUserFollowingProfile, toggleFollow } from '../../services/firebase';
import ModalNewWatch from '../newWatch/ModalNewWatch';
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
    username: profileUsername,
    imageurl: imgurl
  }
}) {
  const { user } = useUser();
  const [isFollowingProfile, setIsFollowingProfile] = useState(false);
  const activeButtonFollow = user.username && user.username !== profileUsername;
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenAvitar, setIsOpenAvitar] = useState(false);
  const editProfile = user.username && user.username === profileUsername;
  const avatar = user.imageurl;

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
    <div className="grid grid-cols-3 gap-2 pb-2 pt-2">
      <div className="container flex justify-center border-r-2 border-grey-700">
        {user.username && (
          <img className="rounded-full h-30 w-auto flex shadow-lg" src={imgurl} alt="imgurl" />
        )}
      </div>
      <div className="flex items-center justify-center flex-col col-span border-r-2 border-grey-700">
        <div className="container flex item-center">
          <p className="text-2xl mr-4 capitalize" style={{ fontFamily: 'Quinngothic' }}>
            {profileUsername}
            {/* {name[0].toUppercase}
            {name.slice(1)} */}
          </p>
          <span
            className="font-medium inline-block align-bottom capitalize"
            style={{ fontFamily: 'Quinngothic' }}
          >
            {user.fullName}
            {/* {nameFull[0].toUppercase}
            {nameFull.slice(1)} */}
          </span>
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
              <p className="mr-4" style={{ fontFamily: 'Quinngothic' }}>
                <span className="font-bold">{watchesCount}</span>
                {`  `}
                Watches
              </p>
              <p className="mr-4" style={{ fontFamily: 'Quinngothic' }}>
                <span className="font-bold">{followerCount}</span>
                {`  `}
                {followerCount === 1 ? `Follower` : `Followers`}
              </p>
              <p className="mr-4" style={{ fontFamily: 'Quinngothic' }}>
                <span className="font-bold">{following?.length}</span>
                {`  `}
                Following
              </p>
            </>
          )}
        </div>
      </div>
      <div className="flex items-center justify-center flex-col col-span">
        <div className="container flex item-center">
          {editProfile && (
            <div className="ml-1">
              <div className="flex items-center justify-evenly flex-col col-span">
                <div className="container mr-2">
                  <button
                    className="bg-gradient-to-r from-green-400 to-blue-500 font-bold text-base  rounded text-white h-10 w-40"
                    type="button"
                    onClick={() => setIsOpenAvitar(true)}
                    style={{ fontFamily: 'Acakadut' }}
                  >
                    Profile Settings
                  </button>
                  <ModalAvitar
                    userAvatar={avatar}
                    documentId={user.docId}
                    profile={profileUsername}
                    userId={profileUserId}
                    open={isOpenAvitar}
                    onClose={() => setIsOpenAvitar(false)}
                  />
                </div>
              </div>
              <div className="flex items-center justify-evenly flex-col col-span">
                <div className="container mr-2">
                  <button
                    className="bg-gradient-to-r from-blue-500 to-pink-600 font-bold text-xl  rounded text-white mt-2 pr-5 pl-5 h-10 w-40"
                    type="button"
                    onClick={() => setIsOpen(true)}
                    style={{ fontFamily: 'Acakadut' }}
                  >
                    Add New Watch
                  </button>
                  <ModalNewWatch
                    userAvatar={avatar}
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
    following: PropTypes.array,
    imageurl: PropTypes.string
  }).isRequired
};
