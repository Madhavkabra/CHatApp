import React from 'react'
import Avatar from 'react-avatar'
import UserProfile from '../UserProfile'

import styles from './sidebar.module.css'

const SideBar = ({ currentUsersId }) => {
  return (
    <div className={styles.root}>
      <UserProfile currentUsersId={currentUsersId} />
      <Avatar
        name={`${currentUsersId.firstName} ${currentUsersId.lastName}`}
        size="32"
        round
        textSizeRatio={3}
      />
    </div>
  )
}

export default SideBar
