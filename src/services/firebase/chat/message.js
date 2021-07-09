import { db } from '../firebase';

const chatRoomRef = db.collection('org').doc('chat').collection('chatRoom');

export const sendMessage = (messageText, chatRoomId, sentBy) => {
  if (messageText.trim()) {
    const message = {
      messageText,
      sentAt: new Date(),
      sentBy,
    };
    return new Promise((resolve, reject) => {
      chatRoomRef
        .doc(chatRoomId)
        .collection('messages')
        .add(message)
        .then(function (docRef) {
          resolve(message);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  }
};

export const fetchMessagesByChatRoomId = (chatRoomId) => {
  const messages = [];
  try {
    chatRoomRef
      .doc(chatRoomId.trim())
      .collection('messages')
      .orderBy('sentAt')
      .onSnapshot((querySnapshot) => {
        const allMessages = [];
        querySnapshot.forEach((doc) => {
          if (doc) allMessages.push(doc.data());
        });
        messages = allMessages;
      });
    return messages;
  } catch (err) {
    return err;
  }
};
