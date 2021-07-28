import React from 'react'
import { auth } from '../../../../services/firebase/firebase'
import cx from 'classnames'

import styles from './../../chatRoom.module.css'
import Messages from '../Messages'

const MessageChatContainer = ({
  chatsData,
  chatID,
  isEmojiOpen,
  editMessageHandler,
  latestMessageRef,
  deleteMessageHandler,
  toggleMenu,
  isMenuOpen,
}) => {
  return (
    <div
      className={cx(styles.chatContainer, {
        [styles.chatContainerWithEmoji]: isEmojiOpen,
        [styles.chatContainerWithOutEmoji]: !isEmojiOpen,
      })}
    >
      {!!chatsData?.length ? (
        chatsData?.map((chat, index) => {
          const isSentByMe = chat.sentBy === auth().currentUser.email
          const isChatToggleOpen = chatID === chat.id
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
                <Messages
                  isSentByMe={isSentByMe}
                  chat={chat}
                  editMessageHandler={(message) => editMessageHandler(message)}
                  deleteMessageHandler={(message) =>
                    deleteMessageHandler(message)
                  }
                  toggleMenu={(id) => toggleMenu(id)}
                  isMenuOpen={isMenuOpen}
                  isChatToggleOpen={isChatToggleOpen}
                />
              </div>
            </div>
          )
        })
      ) : (
        <p>Say Hi! You are the first one here.</p>
      )}
    </div>
  )
}

export default MessageChatContainer
