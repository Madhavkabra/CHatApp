import React, { useEffect, useRef, useState } from 'react'
import Avatar from 'react-avatar'
import { uploadProfile } from '../../../../services/firebase/user/uploadProfile'

import styles from './../../userProfile.module.css'

const EditProfile = ({ userData, setIsEditPageOpen }) => {
  const [profile, setProfile] = useState({
    preview: null,
    file: null,
    firstName: userData.firstName,
    lastName: userData.lastName,
  })

  const editProfileRef = useRef(null)

  useEffect(() => {
    const sideBar = editProfileRef.current
    sideBar.addEventListener('click', (e) => {
      if (e.target === sideBar) {
        setIsEditPageOpen(false)
      }
    })

    return () => sideBar.removeEventListener('click', () => {})
  })

  const editProfie = (e) => {
    e.stopPropagation()
    e.preventDefault()
    uploadProfile(profile, userData)
    setIsEditPageOpen(false)
  }

  const onChangeProfile = (e) => {
    e.stopPropagation()
    setProfile({
      ...profile,
      preview: URL.createObjectURL(e.target.files[0]),
      file: e.target.files[0],
    })
  }

  return (
    <div className={styles.editProfileContainer} ref={editProfileRef}>
      <div className={styles.editProfileWrapper}>
        {profile.preview ? (
          <img src={profile.preview} alt="" className={styles.profilePreview} />
        ) : (
          <Avatar
            name={`${userData.firstName} ${userData.lastName}`}
            size="42"
            round
            textSizeRatio="3"
          />
        )}
        <input
          type="file"
          onChange={onChangeProfile}
          className={styles.profilePicker}
          required
        />
        <p>firstName</p>
        <input
          value={profile.firstName}
          onChange={(e) =>
            setProfile({ ...profile, firstName: e.target.value })
          }
          required
        />
        <p>lastName</p>
        <input
          value={profile.lastName}
          onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
        />
        <button onClick={editProfie}>upload</button>
      </div>
    </div>
  )
}

export default EditProfile
