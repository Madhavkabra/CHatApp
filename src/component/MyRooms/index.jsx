import React from "react";

import useMyRooms from "../../hooks/getMyRooms";
import GroupChat from "./components/GroupChat";
import PersonalChat from "./components/PersonalChat";

import styles from "./myRoom.module.css";

const MyRooms = ({ currentUsersId, users }) => {

  const { rooms } = useMyRooms(currentUsersId && currentUsersId[0]?.id);
  const personalChats = [];
  const groupChat = [];

  rooms.forEach((room) => {
    room.type === "oneOnOne" ? personalChats.push(room) : groupChat.push(room);
  });

  return (
    <div className={styles.myRoomContainer}>
      {!!(rooms && rooms.length) && (
        <>
          <div className={styles.content}>
            <PersonalChat
              room={personalChats}
              currentUsersId={currentUsersId}
              users={users}
            />
          </div>
          <GroupChat
            room={groupChat}
            currentUsersId={currentUsersId}
            users={users}
          />
        </>
      )}
    </div>
  );
};

export default MyRooms;
