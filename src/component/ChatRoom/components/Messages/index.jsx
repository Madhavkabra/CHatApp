import React from 'react'
import ToggleMenu from '../../../ToggleMenu'
import styles from './../../chatRoom.module.css'

const Messages = ({
  isSentByMe,
  chat,
  isMenuOpen,
  editMessageHandler,
  deleteMessageHandler,
  toggleMenu,
  isChatToggleOpen,
}) => {
  return (
    <>
      <div>
        <p className={styles.texMessage}>{chat.messageText}</p>
        <div className={styles.messageContainer}>
          {chat.isEdited && <span className={styles.edit}>(edit)</span>}
        </div>
      </div>
      {isSentByMe && (
        <ToggleMenu
          isMenuOpen={isMenuOpen}
          editMessageHandler={() => editMessageHandler(chat.messageText)}
          deleteMessageHandler={() => deleteMessageHandler(chat.sentBy)}
          onClick={() => toggleMenu(chat.id)}
          isChatToggleOpen={isChatToggleOpen}
        />
      )}
    </>
  )
}

export default Messages
