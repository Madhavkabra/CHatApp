import React from 'react'
import { useHistory } from 'react-router-dom'
import useMyRooms from '../../hooks/getMyRooms'

const MyRooms = ({ currentUsersId }) => {
  const { rooms } = useMyRooms(currentUsersId && currentUsersId[0]?.id)
  const history = useHistory()

  return (
    <div>
      My Rooms
      <div>
        {!!(rooms &&
          rooms.length) &&
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
  )
}

export default MyRooms