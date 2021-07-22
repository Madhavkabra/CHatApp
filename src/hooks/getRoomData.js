import { useEffect, useState } from 'react'
import { db } from '../services/firebase/firebase'

const useGetRoomData = (roomId) => {
  const [data, setData] = useState({
    error: null,
    loading: true,
    members: [],
    roomName: null
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
        const roomData = doc.data() //get room data
        const membersId = roomData.members //fetch all room member id 
        const membersData = [] //array to load data lazyly 
        const members = await membersId.map(member => userRef.doc(member).get()) //get member data from user collection through memberId it will return array of promises
        for await (const member of members) {
          membersData.push(member.data()) //resolve promise and load data inside membersData 
        }
        setData({ ...data, members: membersData, roomName: roomData.name }) //seting up the memberData inside state
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