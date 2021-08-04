import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import cx from "classnames";

import Modal from "../../../Modal";

import styles from "./../PersonalChat/personalChat.module.css";

const GroupChat = ({ room, history, currentUsersId, users }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className={styles.header}>
        <p className={styles.heading}>Rooms</p>
        <p
          className={cx(styles.heading, styles.plus)}
          onClick={() => setIsModalOpen(true)}
        >
          +
        </p>
      </div>
      {room.map((room, index) => (
        <div
          key={index}
          className={styles.container}
          onClick={() => history.push(`/rooms/${room.id}`)}
        >
          <img
            src="https://demo.dashboardpack.com/fiori-html-pro/assets/images/avatars/2.jpg"
            alt=""
            className={styles.logo}
          />
          <div className={styles.content}>
            <p className={styles.memberName}>{room.name}</p>
            <p className={styles.memberName}>4</p>
          </div>
        </div>
      ))}
      {isModalOpen && (
        <Modal
          currentUsersId={currentUsersId}
          users={users}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </>
  );
};

export default withRouter(GroupChat);
