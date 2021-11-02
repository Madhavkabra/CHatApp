import { db, storage } from "../firebase";
export const uploadProfile = (profile, userData) => {
  storage
    .ref(`profiles/${userData?.uid}.${profile.file?.type?.split("/")[1]}`)
    .put(profile.file)
    .on("state", () => {
      storage
        .ref(`profiles/${userData?.uid}.${profile.file?.type?.split("/")[1]}`)
        .getDownloadURL()
        .then((value) => {
          db.collection("user").doc(userData?.id).update({
            profile: value,
            firstName: profile.firstName,
            lastName: profile.lastName,
          });
        });
    });
};
