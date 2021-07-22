import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { auth } from '../../services/firebase/firebase'
import cx from 'classnames'
import { Picker } from 'emoji-mart'

import useGetMessage from '../../hooks/getAllMessage'
import useGetRoomData from '../../hooks/getRoomData'
import { sendMessage } from '../../services/firebase/chat/message'
import DisplayParticipants from '../displayParticipants'

import styles from './chatRoom.module.css'
import 'emoji-mart/css/emoji-mart.css'

const ChatRoom = () => {
  const [messageField, setMessageField] = useState('')
  const [chatsData, setChatsData] = useState([])
  const [isEmojiOpen, setisEmojiOpen] = useState(false)

  const { roomId } = useParams()
  const latestMessageRef = useRef(null)
  const messageFieldRef = useRef(null)

  const senderEmail = auth()?.currentUser?.email
  const { messages: messageData } = useGetMessage(roomId)
  const { members, roomName } = useGetRoomData(roomId)

  useEffect(() => {
    setChatsData(messageData)
    return () => {}
  }, [messageData])

  useEffect(() => {
    latestMessageRef.current?.scrollIntoView({ behavior: 'smooth' })
  })

  const sendMessageToChatRoom = () => {
    sendMessage(messageField, roomId, senderEmail)
      .then((success) => {
        console.log(success)
        setMessageField('')
      })
      .catch((error) => {
        console.log(`err : ${error}`)
      })
  }

  const toggleEmojiPicker = () => {
    setisEmojiOpen(!isEmojiOpen)
  }

  const onEmojiPick = (emojiObject) => {
    const currentCursorLocation = messageFieldRef.current.selectionStart
    const firstPart = messageField.substring(0, currentCursorLocation)
    const secondPart = messageField.substring(
      currentCursorLocation,
      messageField.length,
    )
    setMessageField(firstPart + emojiObject.native + secondPart)
  }

  return (
    <>
      <div className={styles.chatAppWraperContainer}>
        <DisplayParticipants members={members} roomName={roomName} />
        <div
          className={cx(styles.chatContainer, {
            [styles.chatContainerWithEmoji]: isEmojiOpen,
            [styles.chatContainerWithOutEmoji]: !isEmojiOpen,
          })}
        >
          {!!chatsData?.length ? (
            chatsData?.map((chat, index) => {
              const isSentByMe = chat.sentBy === auth().currentUser.email
              return (
                <div
                  key={index}
                  className={cx({
                    [styles.wraper]: isSentByMe,
                  })}
                >
                  <div
                    className={cx(styles.messages, {
                      [styles.myMessages]: isSentByMe,
                    })}
                    ref={latestMessageRef}
                  >
                    <div>
                      {!isSentByMe && (
                        <p className={styles.sender}>{chat.sentBy}</p>
                      )}
                      <div className={styles.messageContainer}>
                        <span>{chat.messageText}</span>
                        <span className={styles.time}>
                          {new Date(
                            chat.sentAt.seconds * 1000,
                          ).toLocaleTimeString('en-US', {
                            hour12: true,
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          ) : (
            <p>Say Hi! You are the first one here.</p>
          )}
        </div>
        <div className={styles.lowerContainer}>
          <img
            src="https://image.flaticon.com/icons/png/128/158/158420.png"
            alt=""
            className={styles.emoji}
            onClick={toggleEmojiPicker}
          />
          <input
            value={messageField}
            onChange={(e) => setMessageField(e.target.value)}
            className={styles.messageField}
            type="text"
            ref={messageFieldRef}
          />
          <img
            src="https://freesvg.org/img/Soeb-Plain-Arrows-9.png"
            alt="submit button"
            width="32"
            onClick={sendMessageToChatRoom}
          />
        </div>
        {isEmojiOpen && (
          <Picker
            className={styles['emoji-mart-scroll']}
            set="google"
            theme="dark"
            title=""
            style={{ width: '100%' }}
            onClick={(emojiObject) => onEmojiPick(emojiObject)}
          />
        )}
      </div>
    </>
  )
}

export default ChatRoom
