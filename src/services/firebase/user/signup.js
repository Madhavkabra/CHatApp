import { auth, db } from "../firebase";

export function signup(email, password) {
  return new Promise((resolve, reject) => {
    return auth().createUserWithEmailAndPassword(email, password).then((userCredential) => {
      const user = {
        createdAt: new Date(),
        chatRoom: [],
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        name: userCredential.user.displayName
      };

      db.collection('user').add(user).then(function (docRef) {
        resolve(docRef);
      })
    })
      .catch((error) => {
        reject(error)
      });

  })
}

export default signup