// import { useState } from 'react';
// import storage from '../../lib/firebaseStorage';

// export default function Imageform() {
//   const [image, setImage] = useState('');
//   const upload = () => {
//     if (image == null) return;
//     storage.ref(`/images/${image.name}`).put(image).on('state_changed', alert('success'), alert);
//   };

//   return (
//     <div className="Imageform">
//       <center>
//         <input
//           type="file"
//           onChange={(e) => {
//             setImage(e.target.files[0]);
//           }}
//         />
//         <button type="button" onClick={upload}>
//           Upload
//         </button>
//       </center>
//     </div>
//   );
// }
