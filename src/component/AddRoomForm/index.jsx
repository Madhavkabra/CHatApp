import React, { useEffect, useState } from "react";
import { createRoom } from "../../services/firebase/chat/chatRoom";

const AddNewRoom = ({ users, currentUsersId }) => {
  const [roomName, setRoomName] = useState('')
  const [members, setMembers] = useState([])
  const [roomType, setRoomType] = useState("oneOnOne")

  const addMembers = (e) => {
    setMembers([e.target.value, ...members])
  }

  const createNewRoom = async () => {
    await createRoom(members, currentUsersId[0].id, roomName, roomType)
  }

  return (
    <div>
      Create new room
      <div>
        <div>Name</div>
        <input value={roomName} onChange={e => setRoomName(e.target.value)} />
      </div>
      <div>
        <div>Select Members</div>
        <select onChange={addMembers}>
          <option value={''}>Add users to chatroom</option>
          {users.length && users.map(user => (
            !members.includes(user?.id) && <option value={user.id}>{user.email}</option>
          ))}
        </select>
      </div>
      <div>
        <div>Select room type</div>
        <div>
          <select onChange={(e) => setRoomType(e.target.value)}>
            <option value={'oneOnOne'} > 1 - 1 </option>
            <option value={'group'} >Group</option>
          </select>
        </div>
      </div>
      <div>
        <button onClick={createNewRoom}>Create New Room</button>
      </div>
    </div>
  );
};

export default AddNewRoom;