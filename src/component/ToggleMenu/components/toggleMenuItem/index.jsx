import React from 'react'
import cx from 'classnames'

import styles from './../../toggle.module.css'

const ToggleMenuItem = ({
  isMenuOpen,
  editEnable,
  editMessageHandler,
  deleteMessageHandler,
  isChatToggleOpen,
}) => {
  return (
    <>
      {isMenuOpen && isChatToggleOpen && (
        <div className={cx(styles.container)}>
          <button className={styles.item} onClick={editMessageHandler}>
            edit
          </button>
          <button className={styles.item} onClick={deleteMessageHandler}>
            delete
          </button>
        </div>
      )}
    </>
  )
}

export default ToggleMenuItem
