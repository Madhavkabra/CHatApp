import { useEffect, useState } from 'react'
import { db } from '../services/firebase/firebase'

const useGetRoomMembers = (roomId) => {
  const [data, setData] = useState({
    error: null,
    loading: true,
    members: [],
  });

  const roomRef = db
    .collection('org')
    .doc('chat')
    .collection('chatRoom')
    .doc(roomId)

  useEffect(() => {
    roomRef.get().then((doc) => {
      if (doc.exists) {
        console.log("Document data:", doc.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  }, [])

  return data
}


export default useGetRoomMembers