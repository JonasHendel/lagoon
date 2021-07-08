import React from 'react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import NavBar from './navbar/NavBar';
import CalendarDetail from './calendar/Detail';
import CalendarAdd from './calendar/AddEvent';

const Layout = ({ children }) => {
  const router = useRouter();

  const [navBarVisible, setNavBarVisible] = useState(true);

  const noNav = ['/login', '/register'];

  useEffect(() => {
    setNavBarVisible(noNav.includes(router.pathname));
  });

  return (
    <div>
      {!navBarVisible && (
        <div>
          <CalendarAdd />
          <CalendarDetail />
          <NavBar />
        </div>
      )}
      {children}
    </div>
  );
};

export default Layout;
