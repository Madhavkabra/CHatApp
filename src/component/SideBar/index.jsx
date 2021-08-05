import React from 'react'
import Avatar from 'react-avatar'

import styles from './sidebar.module.css'

const SideBar = ({ currentUsersId }) => {
  return (
    <div className={styles.root}>
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
