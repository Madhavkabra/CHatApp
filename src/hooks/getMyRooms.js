import React, { useState } from 'react';
import { db } from '../services/firebase/firebase';

const chatRoomRef = db.collection('org').doc('chat').collection('chatRoom');

function useMyRooms(userId) {
  if (!userId) {
    console.log("You need a id")
  }

  const [data, setData] = useState({
    error: null,
    loading: true,
    rooms: [],
  });

  React.useEffect(() => {
    const unsubscribe = chatRoomRef
      .where('members', 'array-contains', userId)
      .onSnapshot(
        (snapshot) => {
          setData({
            error: null,
            loading: false,
            rooms: snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })),
          });
        },
        (error) => {
          setData({
            error,
            loading: false,
            rooms: [],
          });
        },
      );

    return unsubscribe;
  }, []);

  return data;
}


export default useMyRooms;