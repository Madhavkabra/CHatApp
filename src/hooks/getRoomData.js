import { useEffect, useState } from 'react'
import { db } from '../services/firebase/firebase'

const useGetRoomData = (roomId) => {
  const [data, setData] = useState({
    error: null,
    loading: true,
    members: [],
    roomName: null,
    roomType: null
  });

  const roomRef = db
    .collection('org')
    .doc('chat')
    .collection('chatRoom')
    .doc(roomId)

  const userRef = db.collection('user')

  useEffect(() => {

    roomRef.get().then(async (doc) => {
      if (doc.exists) {
        const roomData = doc.data()
        const membersId = roomData.members
        const membersData = []
        const members = await membersId.map(member => userRef.doc(member).get())
        for await (const member of members) {
          membersData.push(member.data())
        }
        setData({ ...data, members: membersData, roomName: roomData.name, roomType: roomData.type })
      } else {
        console.log("No such document!");
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  }, [])
  return data
}


export default useGetRoomData