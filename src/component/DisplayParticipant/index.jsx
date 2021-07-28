import React from 'react'
import { useHistory } from 'react-router-dom'
import styles from './displayParticipants.module.css'

const DisplayParticipants = ({ members, roomName }) => {
  const history = useHistory()

  const backToHomePage = () => {
    history.goBack()
  }

  return (
    <div className={styles.displayPatientHeader}>
      <img
        src="https://freesvg.org/img/Soeb-Plain-Arrows-8.png"
        width="32px"
        alt="back button"
        onClick={backToHomePage}
      />
      <img
        src="https://demo.dashboardpack.com/fiori-html-pro/assets/images/avatars/2.jpg"
        alt=""
        className={styles.logo}
      />
      <div className={styles.participantsContainer}>
        <p className={styles.groupName}>{roomName}</p>
        <div className={styles.membersName}>
          {members.map((member, index) => (
            <div key={index} className={styles.participantsEmail}>
              {member.email}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DisplayParticipants
