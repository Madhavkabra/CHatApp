import React, { useEffect, useState } from 'react'
import useUsers from '../../hooks/getAllUsers'
import useMyRooms from '../../hooks/getMyRooms'
import { auth } from '../../services/firebase/firebase'

import ChatRoom from '../ChatRoom'
import Logout from '../Logout'
import MyRooms from '../MyRooms'
import UserProfileView from '../UserProfile/components/UserProfileView'

import styles from './chat.module.css'

const Chat = () => {
  const [currentChatRoomId, setCurrentChatRoomId] = useState('')
  const { users } = useUsers()

  const currentUsersId =
    users && users.filter((user) => user.email === auth()?.currentUser?.email)

  currentUsersId &&
    localStorage.setItem('currentUserDetail', JSON.stringify(currentUsersId[0]))

  const { rooms } = useMyRooms(currentUsersId[0]?.id)

  useEffect(() => {
    if (rooms.length > 0) {
      setCurrentChatRoomId(rooms[0].id)
    }
  }, [rooms])

  return (
    <>
      {/* <AddNewRoom users={users} currentUsersId={currentUsersId} /> */}

      {!!currentChatRoomId.length && (
        <div className={styles.chatRoomContainer}>
          <MyRooms
            currentUsersId={currentUsersId}
            users={users}
            rooms={rooms}
            setCurrentChatRoomId={setCurrentChatRoomId}
          />
          <ChatRoom roomId={currentChatRoomId} />
        </div>
      )}
      <div className={styles.root}>
        <UserProfileView />
        <Logout />
      </div>
    </>
  )
}
export default Chat
