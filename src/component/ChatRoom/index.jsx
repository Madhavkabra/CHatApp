import React, { useEffect, useState } from 'react'
import firebase from 'firebase'
import { useParams } from 'react-router-dom'
import { auth, db } from '../../services/firebase/firebase'
import useGetMessage from '../../hooks/getAllMessage'
import useGetRoomMembers from '../../hooks/getRoomMembers'
import styles from './chatRoom.module.css'
import Logout from '../Logout'

const ChatRoom = () => {
  const [messageField, setMessageField] = useState('')
  const [chatsData, setChatsData] = useState([])

  const { roomId } = useParams()
  const senderEmail = auth()?.currentUser?.email

  const { messages: messageData } = useGetMessage(roomId)
  const { members } = useGetRoomMembers(roomId)

  useEffect(() => {
    setChatsData(messageData)
    return () => { }
  }, [messageData])

  const sendMessage = () => {
    db.collection('org')
      .doc('chat')
      .collection('chatRoom')
      .doc(roomId)
      .collection('chats')
      .add({
        message: messageField,
        senderEmail,
        sendAt: firebase.firestore.Timestamp.now(),
      })
      .then((success) => console.log(success))
      .catch((error) => console.log(error))
    setMessageField('')
  }
  return (
    <div>
      {!!(chatsData?.length) ? chatsData?.map((chat, index) => (
        <div key={index}>
          <div>
            <span className={styles.sender}>{chat.senderEmail}</span>
            <span className={styles.time}>{new Date(chat.sendAt.seconds * 1000).toLocaleTimeString('en-US', {
              hour12: true,
            })}
            </span>
          </div>
          <div>
            {chat.message}
          </div>
        </div>
      )) : <div>Say Hi! You are the first one here.</div>
      }
      <div className={styles.lowerContainer}>
        <input
          value={messageField}
          onChange={(e) => setMessageField(e.target.value)}
          type="text"
        />
        <button onClick={sendMessage}>send</button>
      </div>
      <Logout />
    </div>
  )
}

export default ChatRoom
