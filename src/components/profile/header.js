import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import useUser from '../../hooks/use-user';
import { isUserFollowingProfile, toggleFollow } from '../../services/firebase';
import ModalNewWatch from '../newWatch/ModalNewWatch';
import ModalAvitar from '../newWatch/ModalAvitar';
import settingLogo from '../../images/svg_png/smallSettingWhite.png';
import watchLogo from '../../images/svg_png/watch.png';

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
    <div className="grid grid-cols-3 gap-2 pb-2 pt-0 sm:pt-1 md:pt-1 lg:pt-1 xl:pt-1">
      <div className="container flex justify-center border-r-2 border-grey-700 invisible sm:visible md:visible lg:visible xl:visible">
        {user.username && (
          <img className="rounded-full h-32 w-auto flex shadow-lg" src={imgurl} alt="imgurl" />
        )}
      </div>
      <div className="flex flex-col col-span border-r-2 border-grey-700 pl-0 sm:pl-0 md:pl-0 lg:pl-0 xl:pl-0">
        <div className="container flex item-center">
          <p
            className="text-4xl mr-4 capitalize"
            style={{ fontFamily: 'Quinngothic', color: 'rgb(0,15,85)' }}
          >
            {profileUsername}
          </p>
          <span
            className="font-medium inline-block align-bottom capitalize text-2xl pr-3"
            style={{ fontFamily: 'Quinngothic', color: 'rgb(0,15,85)' }}
          >
            {fullName}
          </span>
          {activeButtonFollow && (
            <button
              style={{ fontFamily: 'Acakadut' }}
              className="text-sm mx-1 my-1 px-3 py-0.5 border-grey-700 rounded text-white rounded bg-gradient-to-r from-blue-500 to-pink-600 hover:bg-gradient-to-r hover:from-pink-600 hover:to-blue-500 hover:text-blue"
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
              <p
                className="mr-4 text-base sm:mr-10 sm:text-xl md:mr-10 md:text-xl lg:mr-10 lg:text-xl xl:mr-10 xl:text-xl"
                style={{ fontFamily: 'Quinngothic', color: 'rgb(0,15,85)' }}
              >
                <span className="font-bold">{watchesCount}</span>
                {`  `}
                Watches
              </p>
              <p
                className="mr-4 text-base sm:mr-10 sm:text-xl md:mr-10 md:text-xl lg:mr-10 lg:text-xl xl:mr-10 xl:text-xl"
                style={{ fontFamily: 'Quinngothic', color: 'rgb(0,15,85)' }}
              >
                <span className="font-bold">{followerCount}</span>
                {`  `}
                {followerCount === 1 ? `Follower` : `Followers`}
              </p>
              <p
                className="mr-4 text-base sm:mr-10 sm:text-xl md:mr-10 md:text-xl lg:mr-10 lg:text-xl xl:mr-10 xl:text-xl"
                style={{ fontFamily: 'Quinngothic', color: 'rgb(0,15,85)' }}
              >
                <span className="font-bold">{following?.length}</span>
                {`  `}
                Following
              </p>
            </>
          )}
        </div>
      </div>
      <div className="flex items-center justify-center flex-col col-span">
        <div className=" pl-10 container flex item-center">
          {editProfile && (
            <div className="ml-1">
              <div className="flex items-center justify-evenly flex-col col-span">
                <div className="container mr-2">
                  <button
                    className="text-base text-xl rounded text-white h-10 w-48 hidden sm:block md:block lg:block xl:block"
                    type="button"
                    onClick={() => setIsOpenAvitar(true)}
                    style={{ fontFamily: 'Acakadut', backgroundColor: 'rgb(95,158,160)' }}
                  >
                    <div className="flex items-center">
                      <img alt="setting" src={settingLogo} className="h-6 mb-0.5 pl-3 pr-4" />
                      Add New Avitar
                    </div>
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
                    className="rounded text-white h-10 w-10 block sm:hidden md:hidden lg:hidden xl:hidden"
                    type="button"
                    onClick={() => setIsOpenAvitar(true)}
                    style={{ fontFamily: 'Acakadut', backgroundColor: 'rgb(95,158,160)' }}
                  >
                    <img alt="setting" src={settingLogo} className="h-8 pl-1" />
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
                    className="text-xl rounded text-white mt-6 pr-2 pl-1 h-10 w-48 hidden sm:block md:block lg:block xl:block"
                    type="button"
                    onClick={() => setIsOpen(true)}
                    style={{ fontFamily: 'Acakadut', backgroundColor: 'rgb(95,158,160)' }}
                  >
                    <div className=" flex items-center">
                      <img alt="setting" src={watchLogo} className="h-7 pr-3 pl-2 " />
                      Add New Watch
                    </div>
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
              <div className="flex items-center justify-evenly flex-col col-span">
                <div className="container mr-2">
                  <button
                    className="text-xl rounded flex-shrink text-white mt-2 py-2 h-16 w-10 block sm:hidden md:hidden lg:hidden xl:hidden"
                    type="button"
                    onClick={() => setIsOpen(true)}
                    style={{ fontFamily: 'Acakadut', backgroundColor: 'rgb(95,158,160)' }}
                  >
                    <img alt="setting" src={watchLogo} className="h-8 pl-1" />
                    plus
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
