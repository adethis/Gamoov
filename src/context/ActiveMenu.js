import React, { useState, createContext } from 'react'
import { useLocation } from 'react-router-dom'

export const ActiveMenuContext = createContext()

const ActiveMenuProvider = props => {
  const location = useLocation()
  const [currentMenu, setCurrentMenu] = useState(location.pathname)
  
  return (
    <ActiveMenuContext.Provider value={[currentMenu, setCurrentMenu]}>
      {props.children}
    </ActiveMenuContext.Provider>
  )
}

export default ActiveMenuProvider