import { useEffect, useState } from "react";
import firestore from "firebase";
import { auth, db } from "../services/firebase/firebase";

const useGetMessage = (roomId) => {
  const [data, setData] = useState({
    error: null,
    loading: true,
    messages: [],
  });

  const query = db
    .collection("org")
    .doc("chat")
    .collection("chatRoom")
    .doc(roomId)
    .collection("messages");

  useEffect(() => {
    const userId = auth().currentUser.uid;
    const unSubscribeObserver = query
      .where("isDeleted", "==", false)
      .orderBy("sentAt")
      .onSnapshot(
        (querySnapshot) => {
          const messageData = [];
          querySnapshot.docs.forEach((doc) => {
            const data = doc.data();
            if (userId !== data.sentBy) {
              query.doc(doc.id).update({
                seenBy: firestore.firestore.FieldValue.arrayUnion(userId),
              });
            }
            messageData.push({
              ...data,
              id: doc.id,
            });
          });
          setData({
            error: null,
            loading: false,
            messages: messageData,
          });
        },
        (error) => {
          setData({
            ...data,
            error,
            loading: false,
            messages: [],
          });
        }
      );

    return () => unSubscribeObserver();
  }, [roomId]);

  return data;
};

export default useGetMessage;
