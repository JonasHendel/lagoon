import React from 'react'
import { useContext } from 'react'
import { DataContext } from '../store/GlobalState'
import NavBar from './Navbar'

const Layout = ({children}) => {

  return (
    <div>
      <NavBar/>
      {children}
    </div>
  )
}

export default Layout