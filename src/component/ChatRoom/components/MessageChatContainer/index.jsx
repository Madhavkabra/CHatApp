import React, { useEffect, useState } from 'react'
import { auth } from '../../../../services/firebase/firebase'
import cx from 'classnames'

import styles from './../../chatRoom.module.css'
import Messages from '../Messages'
import { getSeenByMembersWithChat } from '../../../../utils/getSeenByMembersWithChat/getSeenByMembersWithChat'

const MessageChatContainer = ({
  chatsData,
  chatID,
  isEmojiOpen,
  editMessageHandler,
  latestMessageRef,
  deleteMessageHandler,
  toggleMenu,
  isMenuOpen,
  members,
  roomType,
}) => {
  const [chatMessages, setChatMessages] = useState([])

  const loggedInUser = auth().currentUser.uid

  //GET MEMBER DATA BY ID
  useEffect(() => {
    const chat = getSeenByMembersWithChat(chatsData, loggedInUser, members)
    setChatMessages(chat)
  }, [chatsData, loggedInUser, members])

  return (
    <div
      className={cx(styles.chatContainer, {
        [styles.chatContainerWithEmoji]: isEmojiOpen,
        [styles.chatContainerWithOutEmoji]: !isEmojiOpen,
      })}
    >
      {chatMessages?.length ? (
        chatMessages?.map((chat, index) => {
          const isSentByMe = chat.sentBy === auth().currentUser.uid
          const isChatToggleOpen = chatID === chat.id
          return (
            <>
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
                    editMessageHandler={editMessageHandler}
                    deleteMessageHandler={deleteMessageHandler}
                    toggleMenu={toggleMenu}
                    isMenuOpen={isMenuOpen}
                    isChatToggleOpen={isChatToggleOpen}
                  />
                </div>
              </div>
              <div className={styles.seenBy}>
                {roomType === 'group'
                  ? chat.seenBy.map((member) => (
                      <>
                        {member?.uid ? (
                          <img
                            src="https://demo.dashboardpack.com/fiori-html-pro/assets/images/avatars/2.jpg"
                            alt=""
                            className={styles.logo}
                          />
                        ) : null}
                      </>
                    ))
                  : 'seen'}
              </div>
            </>
          )
        })
      ) : (
        <p>Say Hi! You are the first one here.</p>
      )}
    </div>
  )
}

export default MessageChatContainer
