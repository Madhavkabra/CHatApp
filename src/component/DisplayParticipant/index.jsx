import React from 'react'
import Avatar from 'react-avatar'
import { useHistory } from 'react-router-dom'
import styles from './displayParticipants.module.css'

const DisplayParticipants = ({ members, roomName, roomType }) => {
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
      <Avatar name={roomName} size="42" round textSizeRatio={3} />
      <div className={styles.participantsContainer}>
        <p className={styles.groupName}>{roomName}</p>
        {roomType === 'group' && (
          <>
            <p
              className={styles.memberName}
            >{`${members.length} participants`}</p>
            <ul className={styles.participantList}>
              {members.map((member, index) => (
                <li key={index}>{member.email}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  )
}

export default DisplayParticipants
