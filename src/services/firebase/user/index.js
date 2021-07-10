import { db } from "../firebase";

const userRef = db.collection('user');

export const fetchAllUsers = () => {
  return new Promise((resolve, reject) => {
    const users = [];
    try {
      userRef
        .onSnapshot((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            if (doc) users.push(doc.data());
          });
        });
      return resolve(users);
    } catch (err) {
      reject(err);
    }
  })
};
