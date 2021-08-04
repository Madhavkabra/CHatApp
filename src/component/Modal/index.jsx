import React, { useEffect, useState } from 'react'
import { createRoom } from '../../services/firebase/chat/chatRoom'

import styles from './modal.module.css'

const Modal = ({ currentUsersId, users, setIsModalOpen }) => {
  const [members, setMembers] = useState([])
  const [roomName, setRoomName] = useState('')

  useEffect(() => {
    if (currentUsersId.length) {
      currentUsersId[0]?.id && setMembers([currentUsersId[0].id, ...members])
    }
  }, [currentUsersId?.length])

  const addMembers = (e) => {
    setMembers([e.target.value, ...members])
  }

  const createNewRoom = async () => {
    await createRoom(members, currentUsersId[0].id, roomName, 'group')
      .then(() => {
        setIsModalOpen(false)
      })
      .catch((error) => console.log('error'))
  }

  return (
    <div className={styles.modalWrapper}>
      <div className={styles.modalContainer}>
        <h1>Create New Group</h1>
        <p className={styles.label}>Group Name</p>
        <input
          className={styles.groupField}
          value={roomName}
          placeholder="Type Group Name"
          onChange={(e) => setRoomName(e.target.value)}
        />
        <p className={styles.label}>Select Participants</p>
        <select className={styles.groupField} onChange={addMembers}>
          <option value={''}>Add users to chatroom</option>
          {users.length &&
            users.map(
              (user) =>
                !members.includes(user?.id) && (
                  <option value={user.id}>{user.email}</option>
                ),
            )}
        </select>
        <div className={styles.modalActionContainer}>
          <button className={styles.modalButton} onClick={createNewRoom}>
            Create
          </button>
          <button
            className={styles.modalButton}
            onClick={() => setIsModalOpen(false)}
          >
            cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal
