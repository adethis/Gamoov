import React, { createContext, useState } from 'react'

export const ToggleContext = createContext()

export const ToggleProvider = props => {
  const [collapsed, setCollapsed] = useState(false)
  
  const handleToggle = () => {
    setCollapsed(!collapsed)
  }

  return (
    <ToggleContext.Provider value={[collapsed, setCollapsed, handleToggle]}>
      {props.children}
    </ToggleContext.Provider>
  )
}