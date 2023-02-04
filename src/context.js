import React, { useState } from 'react'
import { useContext } from 'react'

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [list, setList] = useState([])
  const [sortedList, setSortedList] = useState(list)

  return (
    <AppContext.Provider value={{ list, setList, sortedList, setSortedList }}>
      {children}
    </AppContext.Provider>
  )
}

const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider, useGlobalContext }
