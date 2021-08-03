import { withRouter } from "react-router-dom";
import cx from "classnames";
import Avatar from "react-avatar";

import useUsers from "../../../../hooks/getAllUsers";
import { createRoom } from "../../../../services/firebase/chat/chatRoom";
import styles from "./personalChat.module.css";

const PersonalChat = ({ room, history, currentUsersId }) => {
  const { users } = useUsers();
  const createNewRoom = (members) => {
    createRoom(members, currentUsersId[0].id, "", "oneOnOne")
      .then((success) => {
        navigateUser(success.id);
      })
      .catch(() => {});
  };
  //we have to find room where member array contain the person i clicked on
  const openRoom = (id) => {
    if (id === currentUsersId[0]?.id) {
      const myPersonalChatRoom = room.find(
        (roomData) => roomData.members.length === 1
      );
      navigateToChat(myPersonalChatRoom, [id]);
      return;
    }
    const roomDetail = room.find((roomData) => roomData.members.includes(id));
    navigateToChat(roomDetail, [currentUsersId[0].id, id]);
  };
  const navigateUser = (roomId) => history.push(`/rooms/${roomId}`);
  const navigateToChat = (roomDetail, memberList) => {
    if (roomDetail?.id) {
      navigateUser(roomDetail.id);
    } else {
      createNewRoom(memberList);
    }
  };
  return (
    <>
      <div className={styles.header}>
        <p className={styles.heading}>chat</p>
        <p className={cx(styles.heading, styles.plus)}>+</p>
      </div>
      {users.length > 0 &&
        users.map((user, index) => {
          return (
            <div
              key={index}
              className={styles.container}
              onClick={() => openRoom(user.id)}
            >
              {user.profile ? (
                <img src={user.profile} alt="" className={styles.logo} />
              ) : (
                <Avatar
                  className={styles.logo}
                  name={`${user.firstName} ${user.lastName}`}
                  size="24"
                  round
                  textSizeRatio={3}
                />
              )}
              <div className={styles.content}>
                <p
                  className={styles.memberName}
                >{`${user.firstName} ${user.lastName}`}</p>
                <p className={styles.memberName}>4</p>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default withRouter(PersonalChat);
