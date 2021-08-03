import React from 'react'
import { withRouter } from 'react-router-dom'

const UserProfileView = ({ history }) => {
  return (
    <svg
      width="42"
      height="42"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={() => history.push('/editProfile')}
    >
      <path
        d="M8.78516 7.58149C8.78516 9.51059 10.3545 11.08 12.2837 11.08C14.2128 11.08 15.7822 9.51059 15.7822 7.58149C15.7822 5.65239 14.2128 4.08301 12.2837 4.08301C10.3545 4.08301 8.78516 5.65239 8.78516 7.58149Z"
        fill="#346BD1"
      />
      <path
        d="M6.70836 20.0008H17.8589C18.3208 20.0008 18.6952 19.6263 18.6952 19.1645C18.6952 15.6292 15.819 12.7529 12.2836 12.7529C8.7483 12.7529 5.87207 15.6292 5.87207 19.1645C5.87207 19.6263 6.24651 20.0008 6.70836 20.0008Z"
        fill="#346BD1"
      />
    </svg>
  )
}

export default withRouter(UserProfileView);
