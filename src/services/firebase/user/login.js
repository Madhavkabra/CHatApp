import { auth } from "../firebase";

const login = (email, password) => {
  return new Promise((resolve, reject) => {
    return auth().signInWithEmailAndPassword(email, password).then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      resolve(user)
    })
      .catch((error) => {
        reject(error)
      });

  })
}

export default login