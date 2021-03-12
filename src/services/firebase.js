import { firebase, FieldValue } from '../lib/firebase';

export async function doesUsernameExist(username) {
  const result = await firebase
    .firebase()
    .collection('users')
    .where('username', '==', username)
    .get();

  console.log(result);
  return result.docs.map((user) => user.data().length > 0);
}
