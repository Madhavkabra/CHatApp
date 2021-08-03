import { withRouter } from "react-router-dom";
import cx from "classnames";
import Avatar from "react-avatar";

import useUsers from "../../../../hooks/getAllUsers";

import styles from "./personalChat.module.css";

const PersonalChat = ({ room, history, currentUsersId }) => {
  const { users } = useUsers();

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
