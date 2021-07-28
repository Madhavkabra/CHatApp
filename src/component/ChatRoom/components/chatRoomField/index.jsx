import { Picker } from 'emoji-mart'
import React from 'react'

import 'emoji-mart/css/emoji-mart.css'
import styles from './../../chatRoom.module.css'

const MessageField = ({
  sendMessageToChatRoom,
  toggleEmojiPicker,
  messageField,
  setMessageField,
  messageFieldRef,
  isEmojiOpen,
}) => {
  
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
      <div className={styles.lowerContainer}>
        <img
          src="https://image.flaticon.com/icons/png/128/158/158420.png"
          alt=""
          className={styles.emoji}
          onClick={toggleEmojiPicker}
        />
        <input
          value={messageField}
          onChange={(e) => {
            setMessageField(e.target.value)
          }}
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
    </>
  )
}

export default MessageField
