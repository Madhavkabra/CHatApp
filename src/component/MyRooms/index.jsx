import React from "react";
import GroupChat from "./components/GroupChat";
import PersonalChat from "./components/PersonalChat";

import styles from "./myRoom.module.css";

const MyRooms = ({ currentUsersId, users, rooms, setCurrentChatRoomId }) => {
  const personalChats = [];
  const groupChat = [];

  rooms.forEach((room) => {
    room.type === "oneOnOne" ? personalChats.push(room) : groupChat.push(room);
  });

  return (
    <div className={styles.myRoomContainer}>
      {!!users.length > 0 && (
        <>
          <div className={styles.content}>
            <PersonalChat
              room={personalChats}
              currentUsersId={currentUsersId}
              users={users}
              setCurrentChatRoomId={setCurrentChatRoomId}
            />
          </div>
          <GroupChat
            room={groupChat}
            currentUsersId={currentUsersId}
            users={users}
            setCurrentChatRoomId={setCurrentChatRoomId}
          />
        </>
      )}
    </div>
  );
};

export default MyRooms;
