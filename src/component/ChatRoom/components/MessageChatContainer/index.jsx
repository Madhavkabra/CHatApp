import React, { useEffect, useState } from 'react'
import { auth } from '../../../../services/firebase/firebase'
import cx from 'classnames'
import Avatar from 'react-avatar'

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

  const displaySenderIcon = (chat) => (
    <>
      {chat.sentByUser?.profile ? (
        <img src={chat.sentByUser.profile} alt="" className={styles.profile} />
      ) : (
        <Avatar
          name={`${chat.sentByUser?.firstName} ${chat.sentByUser?.lastName}`}
          size="42"
          round
          textSizeRatio={3}
        />
      )}
    </>
  )

  const sentAt = (sentAt) => {
    const date = new Date(sentAt.seconds * 1000).toLocaleTimeString('en-US', {
      hour12: true,
    })
    return `${date.split(':', 2).join(':')} ${date.split(' ', 2)[1]}`
  }

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
                className={cx(styles.wrapper, {
                  [styles.sentByMe]: isSentByMe,
                })}
              >
                {!isSentByMe && displaySenderIcon(chat)}
                <div
                  className={cx(styles.sendBy, {
                    [styles.sendByMe]: isSentByMe,
                  })}
                >
                  <p className={styles.sender}>
                    {`${chat?.sentByUser?.firstName} ${chat?.sentByUser?.lastName}, `}
                    {sentAt(chat.sentAt)}
                  </p>
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
                {isSentByMe && displaySenderIcon(chat)}
              </div>
              <div className={styles.seenBy}>
                {chat.seenBy.map((member) =>
                  roomType === 'group' ? (
                    <>
                      {member?.uid ? (
                        <img
                          src="https://demo.dashboardpack.com/fiori-html-pro/assets/images/avatars/2.jpg"
                          alt=""
                          className={styles.logo}
                        />
                      ) : null}
                    </>
                  ) : (
                    <>
                      {member?.uid ? <p className={styles.seen}>seen</p> : null}
                    </>
                  ),
                )}
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
