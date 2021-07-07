import React from 'react';
import { useRouter } from 'next/router';
import NavBar from './navbar/NavBar';
import CalendarDetail from './calendar/Detail';
import CalendarAdd from './calendar/AddEvent';

const Layout = ({ children }) => {
  const router = useRouter();

  let noNavPaths = ['/login', '/register'];
  let showNav = !noNavPaths.includes(router.pathname);

  return (
    <div>
      <CalendarAdd />
      <CalendarDetail />
      {showNav && <NavBar />}
      {children}
    </div>
  );
};

export default Layout;
