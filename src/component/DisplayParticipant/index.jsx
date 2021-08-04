import React from "react";
import Avatar from "react-avatar";
import cx from "classnames";

import styles from "./displayParticipants.module.css";

const DisplayParticipants = ({ members, roomName, roomType }) => {

  const userData = JSON.parse(localStorage.getItem("currentUserDetail"));

  const getMemberForOnetoOneChat = (members, currentUserData) => {
    const member = members.filter((memberId) => userData.uid !== memberId.uid);
    if (member.length >= 1) {
      return member[0];
    } else {
      return currentUserData;
    }
  };

  const member = getMemberForOnetoOneChat(members, userData);

  const chatRoomName =
    roomType === "group"
      ? roomName
      : `${member?.firstName} ${member?.lastName}`;

  return (
    <div className={styles.displayPatientHeader}>
      <Avatar name={chatRoomName} size="42" round textSizeRatio={3} />
      <div className={cx(styles.participantsContainer)}>
        <p className={styles.groupName}>{chatRoomName}</p>
        {roomType === "group" && (
          <>
            <p
              className={styles.memberName}
            >{`${members.length} participants`}</p>
            <ul className={styles.participantList}>
              {members.map((member, index) => (
                <li key={index}>{member.email}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default DisplayParticipants;
