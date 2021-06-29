import React from 'react';
import { useContext } from 'react';
import { DataContext } from '../store/GlobalState';
import NavBar from './navbar/NavBar';

const Layout = ({ children }) => {
  return (
    <div>
      <NavBar />
      {children}
    </div>
  );
};

export default Layout;
