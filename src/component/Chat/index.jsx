import React from 'react'
import { useHistory } from 'react-router-dom'
import useUsers from '../../hooks/getAllUsers'
import useMyRooms from '../../hooks/getMyRooms'
import { auth } from '../../services/firebase/firebase'
import AddNewRoom from '../AddRoomForm'

const Chat = () => {
  const { users } = useUsers()
  const currentUsersId =
    users && users.filter((user) => user.email === auth()?.currentUser?.email)
  const { rooms } = useMyRooms(currentUsersId[0]?.id)
  const history = useHistory()

  return (
    <div>
      <AddNewRoom users={users} currentUsersId={currentUsersId} />
      <div>
        My Chats
        <div>
          {rooms &&
            rooms.length &&
            rooms.map((room, index) => (
              <div
                key={index}
                onClick={() => history.push(`/rooms/${room.id}`)}
              >
                {room.name}
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default Chat
