import React from 'react'

const UserProfileView = ({ setIsEditPageOpen }) => {
  return (
    <svg
      width="38"
      height="38"
      viewBox="0 0 20 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={() => setIsEditPageOpen(true)}
    >
      <g filter="url(#filter0_d)">
        <path
          d="M5.32616 12.0681C5.40365 12.1549 5.51564 12.2029 5.63193 12.1991H5.71929L8.54397 11.573C8.62482 11.5517 8.69961 11.5118 8.76237 11.4566L14.6156 5.58879C14.7024 5.51129 14.7504 5.3993 14.7466 5.28302C14.7466 5.16745 14.6993 5.05694 14.6156 4.97726L12.417 2.77866C12.2488 2.60576 11.9722 2.60201 11.7993 2.77024C11.7965 2.773 11.7937 2.77582 11.7909 2.77866L5.93769 8.63187C5.87717 8.69085 5.83645 8.76715 5.82121 8.85028L5.19512 11.675C5.16398 11.8201 5.21417 11.9707 5.32616 12.0681Z"
          fill="#ADBDD8"
        />
        <path
          d="M15.3145 13.4805H4.68555V14.3541H15.3145V13.4805Z"
          fill="#ADBDD8"
        />
      </g>
      <defs>
        <filter
          id="filter0_d"
          x="-2"
          y="0.5"
          width="24"
          height="24"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  )
}

export default UserProfileView
