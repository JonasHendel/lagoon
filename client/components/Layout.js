import React from 'react';
import { useContext, useEffect } from 'react';
import { DataContext } from '../store/GlobalState';
import NavBar from './navbar/NavBar';
import CalendarDetail from './calendar/Detail';
import CalendarAdd from './calendar/AddEvent';
import { useRouter } from 'next/router';

const Layout = ({ children }) => {
  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;
  const router = useRouter()

  useEffect(() => {
		if (Object.keys(auth).length === 0) router.push('/login');
	}, [auth]);
  
  return (
    <div>
      {Object.keys(auth).length === 0 ? (
        <div>
        { children }
        </div>
      ) : (
        <>
          <CalendarAdd />
          <CalendarDetail />
          <NavBar />
          {children}
        </>
      )}
    </div>
  );
};

export default Layout;
