import React from "react";
import { useHistory } from "react-router-dom";
import useUsers from "../../hooks/getAllUsers";
import useMyRooms from "../../hooks/getMyRooms";
import { auth } from "../../services/firebase/firebase";
import AddNewRoom from "../AddRoomForm";
import Logout from "../Logout";
import MyRooms from "../MyRooms";
import UserProfileView from "../UserProfile/components/UserProfileView";

import styles from "./chat.module.css";

const Chat = () => {
  const { users } = useUsers();

  const currentUsersId =
    users && users.filter((user) => user.email === auth()?.currentUser?.email);

  currentUsersId &&
    localStorage.setItem(
      "currentUserDetail",
      JSON.stringify(currentUsersId[0])
    );

  const { rooms } = useMyRooms(currentUsersId[0]?.id);
  const history = useHistory();

  return (
    <>
      <AddNewRoom users={users} currentUsersId={currentUsersId} />
      <MyRooms currentUsersId={currentUsersId} users={users} />
      <div className={styles.root}>
        <UserProfileView />
        <Logout />
      </div>
    </>
  );
};
export default Chat;
