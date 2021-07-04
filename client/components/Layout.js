import React from 'react';
import { useContext } from 'react';
import { DataContext } from '../store/GlobalState';
import NavBar from './navbar/NavBar';
import CalendarDetail from './calendar/Detail';
import CalendarAdd from './calendar/AddEvent';

const Layout = ({ children }) => {
  return (
    <div>
      <CalendarAdd />
      <CalendarDetail />
      <NavBar />
      {children}
    </div>
  );
};

export default Layout;
