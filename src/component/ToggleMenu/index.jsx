import React from 'react'

import ToggleMenuItem from './components/toggleMenuItem'
import ToggleMenuView from './components/toggleMenuView'

const ToggleMenu = ({
  isMenuOpen,
  editMessageHandler,
  deleteMessageHandler,
  onClick,
  isChatToggleOpen,
}) => {
  return (
    <>
      <ToggleMenuView onClick={onClick} />
      <ToggleMenuItem
        isMenuOpen={isMenuOpen}
        editMessageHandler={editMessageHandler}
        deleteMessageHandler={deleteMessageHandler}
        isChatToggleOpen={isChatToggleOpen}
      />
    </>
  )
}

export default ToggleMenu
