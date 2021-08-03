import React, { useEffect, useState } from 'react'
import { auth } from '../../services/firebase/firebase'
import styles from './logout.module.css'

const Logout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
      }
    })
  }, [window.location])

  const logoutUser = () => {
    auth().signOut().then(()=>localStorage.clear())
  }

  return (
    isLoggedIn ?
      <div className={styles.root}>
        <button className={styles.logoutBtn} onClick={logoutUser}>Logout</button>
      </div>
      : null
  )
}

export default Logout
