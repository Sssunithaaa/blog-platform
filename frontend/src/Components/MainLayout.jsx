import React from 'react'
import Headers from './Headers'
import Footers from './Footers'
const MainLayout = ({ children }) => {
  return (
    <div>
      <Headers />
      {children}
      <Footers />
    </div>
  )
}

export default MainLayout
