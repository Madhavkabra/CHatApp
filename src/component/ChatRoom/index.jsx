import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { auth } from '../../services/firebase/firebase'

import DisplayParticipants from '../DisplayParticipants'
import MessageField from './components/chatRoomField'
import MessageChatContainer from './components/MessageChatContainer'

import useGetMessage from '../../hooks/getAllMessage'
import useGetRoomData from '../../hooks/getRoomData'
import {
  deleteMessage,
  editMessage,
  sendMessage,
} from '../../services/firebase/chat/message'

import styles from './chatRoom.module.css'

const ChatRoom = () => {
  const [messageField, setMessageField] = useState('')
  const [chatID, setchatID] = useState(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [chatsData, setChatsData] = useState([])
  const [isEmojiOpen, setisEmojiOpen] = useState(false)
  const { roomId } = useParams()
  const latestMessageRef = useRef(null)
  const messageFieldRef = useRef(null)

  const { messages: messageData } = useGetMessage(roomId)
  const { members, roomName } = useGetRoomData(roomId)

  const senderEmail = auth()?.currentUser?.email

  useEffect(() => {
    setChatsData(messageData)
    return () => {}
  }, [messageData])

  useEffect(() => {
    latestMessageRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatsData])

  const sendMessageToChatRoom = () => {
    if (chatID) {
      editMessage(roomId, chatID, messageField)
        .then((success) => {
          console.log(success)
          setMessageField('')
          setchatID(null)
        })
        .catch((error) => console.log(error))
    } else {
      sendMessage(messageField, roomId, senderEmail)
        .then((success) => {
          console.log(success)
          setMessageField('')
        })
        .catch((error) => {
          console.log(`err : ${error}`)
        })
    }
  }

  const toggleEmojiPicker = () => {
    setisEmojiOpen(!isEmojiOpen)
  }

  const toggleMenu = (id) => {
    setchatID(id)
    setIsMenuOpen(!isMenuOpen)
  }

  const editMessageHandler = (oldMessage) => {
    setMessageField(oldMessage)
    setIsMenuOpen(false)
  }

  const deleteMessageHandler = () => {
    deleteMessage(roomId, chatID).then(() => setchatID(null))
  }

  return (
    <div className={styles.chatAppWraperContainer}>
      <DisplayParticipants members={members} roomName={roomName} />
      <MessageChatContainer
        chatsData={chatsData}
        chatID={chatID}
        isEmojiOpen={isEmojiOpen}
        editMessageHandler={editMessageHandler}
        latestMessageRef={latestMessageRef}
        deleteMessageHandler={deleteMessageHandler}
        toggleMenu={toggleMenu}
        isMenuOpen={isMenuOpen}
      />
      <MessageField
        sendMessageToChatRoom={sendMessageToChatRoom}
        toggleEmojiPicker={toggleEmojiPicker}
        messageField={messageField}
        setMessageField={setMessageField}
        messageFieldRef={messageFieldRef}
        isEmojiOpen={isEmojiOpen}
      />
    </div>
  )
}

export default ChatRoom
