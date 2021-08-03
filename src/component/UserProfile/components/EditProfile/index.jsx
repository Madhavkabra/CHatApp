import React, { useState } from "react";
import { uploadProfile } from "../../../../services/firebase/user/uploadProfile";

const EditProfile = () => {
  const [profile, setProfile] = useState({});
  const userData = JSON.parse(localStorage.getItem("currentUserDetail"));
  const editProfie = (e) => {
    e.preventDefault();
    uploadProfile(profile, userData);
  };
  return (
    <>
      <input type="file" onChange={(e) => setProfile(e?.target?.files[0])} />
      <button onClick={editProfie}>upload</button>
    </>
  );
};

export default EditProfile;
