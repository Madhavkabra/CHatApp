import React, { useState } from 'react';
import { db } from '../services/firebase/firebase';
// Firebase

function useUsers() {
  const [data, setData] = useState({
    error: null,
    loading: true,
    users: [],
  });
  
  React.useEffect(() => {
    const unsubscribe = db
      .collection('user')
      .onSnapshot(
        (snapshot) => {
          setData({
            error: null,
            loading: false,
            users: snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })),
          });
        },
        (error) => {
          setData({
            error,
            loading: false,
            users: [],
          }); // <---4
        },
      );

    return unsubscribe; // <--- 5
  }, []);

  return data;
}

export default useUsers;