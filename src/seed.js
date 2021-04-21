/* eslint-disable */
export function seedDatabase(firebase) {
//   const users = [
//     {
//       userId: '1QBZjzUXfNgVNckqymdyjXg5gCi2',
//       username: 'karl',
//       fullName: 'Ed West',
//       emailAddress: 'ed@west.com',
//       following: ['2'],
//       followers: ['2', '3', '4'],
//       dateCreated: Date.now()
//     },
//     {
//       userId: '2',
//       username: 'raphael',
//       fullName: 'Raffaello Sanzio da Urbino',
//       emailAddress: 'raphael@sanzio.com',
//       following: [],
//       followers: ['1QBZjzUXfNgVNckqymdyjXg5gCi2'],
//       dateCreated: Date.now()
//     },
//     {
//       userId: '3',
//       username: 'dali',
//       fullName: 'Salvador Dalí',
//       emailAddress: 'salvador@dali.com',
//       following: [],
//       followers: ['1QBZjzUXfNgVNckqymdyjXg5gCi2'],
//       dateCreated: Date.now()
//     },
//     {
//       userId: '4',
//       username: 'orwell',
//       fullName: 'George Orwell',
//       emailAddress: 'george@orwell.com',
//       following: [],
//       followers: ['1QBZjzUXfNgVNckqymdyjXg5gCi2'],
//       dateCreated: Date.now()
//     }
//   ];

//   // eslint-disable-next-line prefer-const
//   for (let k = 0; k < users.length; k++) {
//     firebase.firestore().collection('users').add(users[k]);
//   }
  // eslint-disable-next-line prefer-const
  for (let i = 1; i <= 12; ++i) {
    firebase
      .firestore()
      .collection('watches')
      .add({
        watchId: i,
        userId: '2',
        imageSrc: `/images//watches/${i}.jpg`,
        caption: 'Watch 1',
        information: 'Watch information',
        likes: [],
        comments: [
          {
            displayName: 'dali',
            comment: 'Great watch'
          },
          {
            displayName: 'orwell',
            comment: 'I like it'
          }
        ],
        dateCreated: Date.now()
      });
  }
  for (let i = 13; i <= 25; ++i) {
    firebase
      .firestore()
      .collection('watches')
      .add({
        watchId: i,
        userId: '3',
        imageSrc: `/images/watches/${i}.jpg`,
        caption: 'Watch 1',
        information: 'Watch information',
        likes: [],
        comments: [
          {
            displayName: 'dali',
            comment: 'Great watch'
          },
          {
            displayName: 'orwell',
            comment: 'I like it'
          }
        ],
        dateCreated: Date.now()
      });
  }
  for (let i = 26; i <= 38; ++i) {
    firebase
      .firestore()
      .collection('watches')
      .add({
        watchId: i,
        userId: '4',
        imageSrc: `/images/watches/${i}.jpg`,
        caption: 'Watch 1',
        information: 'Watch information',
        likes: [],
        comments: [
          {
            displayName: 'dali',
            comment: 'Great watch'
          },
          {
            displayName: 'orwell',
            comment: 'I like it'
          }
        ],
        dateCreated: Date.now()
      });
  }
}
