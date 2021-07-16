import { useEffect, useState } from 'react'
import { db } from '../services/firebase/firebase'

const useGetMessage = (roomId) => {
  const [data, setData] = useState({
    error: null,
    loading: true,
    messages: [],
  });

  const query = db
    .collection('org')
    .doc('chat')
    .collection('chatRoom')
    .doc(roomId)
    .collection('chats')
    .orderBy('sendAt')

  useEffect(() => {
    const unSubscribeObserver = query.onSnapshot(
      (querySnapshot) => {
        setData({
          error: null,
          loading: false,
          messages: querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })),
        });
      },
      (error) => {
        setData({
          error,
          loading: false,
          messages: [],
        }); // <---4
      },
    )

    return () => unSubscribeObserver()
  }, [])

  return data
}


export default useGetMessage