import React from 'react';
import { useContext } from 'react';
import { DataContext } from '../store/GlobalState';
import NavBar from './navbar/NavBar';
import CalendarDetail from './calendar/Detail';

const Layout = ({ children }) => {
  return (
    <div>
      <CalendarDetail/>
      <NavBar />
      {children}
    </div>
  );
};

export default Layout;
