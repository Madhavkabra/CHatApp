import React, { useState } from 'react'
import EditProfile from './components/EditProfile'
import UserProfileView from './components/UserProfileView'

const UserProfile = ({ currentUsersId }) => {
  const [isEditPageOpen, setIsEditPageOpen] = useState(false)

  return (
    <>
      <UserProfileView setIsEditPageOpen={setIsEditPageOpen} />
      {isEditPageOpen && (
        <EditProfile
          userData={currentUsersId}
          setIsEditPageOpen={setIsEditPageOpen}
        />
      )}
    </>
  )
}

export default UserProfile
