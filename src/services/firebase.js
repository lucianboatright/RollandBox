import { firebase, FieldValue } from '../lib/firebase';

export async function doesUsernameExist(username) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get();

  return result.docs.map((user) => user.data().length > 0);
}

export async function getUserByUsername(username) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get();

  return result.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }));
}

// get user from the firestore where userId === userId (passed from the auth)
export async function getUserByUserId(userId) {
  const result = await firebase.firestore().collection('users').where('userId', '==', userId).get();
  console.log('RRESSULKLTS 3', result.docs);

  const user = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }));

  return user;
}
export async function getSuggestedProfiles(userId, following) {
  const result = await firebase.firestore().collection('users').limit(10).get();

  return result.docs
    .map((user) => ({ ...user.data(), docId: user.id }))
    .filter((profile) => profile.userId !== userId && !following.includes(profile.userId));
}
// updateLoggedInUserFollowing, updateFollowedUserFollowers

export async function updateLoggedInUserFollowing(
  loggedInUserDocId,
  profileId,
  isFollowingProfile
) {
  return firebase
    .firestore()
    .collection('users')
    .doc(loggedInUserDocId)
    .update({
      following: isFollowingProfile
        ? FieldValue.arrayRemove(profileId)
        : FieldValue.arrayUnion(profileId)
    });
}

export async function updateFollowedUserFollowers(
  loggedInUserDocId,
  profileDocId,
  isFollowingProfile
) {
  return firebase
    .firestore()
    .collection('users')
    .doc(profileDocId)
    .update({
      followers: isFollowingProfile
        ? FieldValue.arrayRemove(loggedInUserDocId)
        : FieldValue.arrayUnion(loggedInUserDocId)
    });
}

export async function getWatches(userId, following) {
  const result = await firebase
    .firestore()
    .collection('watches')
    .where('userId', 'in', following)
    .get();
  console.log('result 1', result.docs);
  const userFollowedWatches = result.docs.map((watch) => ({
    ...watch.data(),
    docId: watch.id
  }));

  const watchesWithUserDetails = await Promise.all(
    userFollowedWatches.map(async (watch) => {
      const userLikedWatch = (watch.likes || []).includes(userId);
      const user = await getUserByUserId(watch.userId);
      const { username } = user[0];
      return { username, ...watch, userLikedWatch };
    })
  );
  console.log('watchesWithUserDetails', watchesWithUserDetails);
  return watchesWithUserDetails;
}
export async function getUserWatchesByUsername(username) {
  const [user] = await getUserByUsername(username);
  const result = await firebase
    .firestore()
    .collection('watches')
    .where('userId', '==', user.userId)
    .get();
  console.log('REEESULTS 1', result.docs);

  return result.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }));
}

export async function isUserFollowingProfile(loggedInUserUsername, profileUserId) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', loggedInUserUsername)
    .where('following', 'array-contains', profileUserId)
    .get();

  const [response = {}] = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }));
  return response.userId;
}

// export async function addWatch(Watch) {
//   return firebase
//     .firestore()
//     .collection('users')
//     .add({ imgURL: Watch })
//     .then(() => {
//       setImgURL('')
//     })
// }

export async function toggleFollow(
  isFollowingProfile,
  activeUserDocId,
  profileDocId,
  profileUserId,
  followingUserId
) {
  await updateLoggedInUserFollowing(activeUserDocId, profileUserId, isFollowingProfile);
  await updateFollowedUserFollowers(profileDocId, followingUserId, isFollowingProfile);
}
