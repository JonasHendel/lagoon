import React from 'react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import NavBar from './navbar/NavBar';
import CalendarDetail from './calendar/Detail';
import CalendarAdd from './calendar/AddEvent';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { setAuth } from '../store/features/authSlice';
import { postData } from '../utils/fetchData';

const Layout = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [navBarVisible, setNavBarVisible] = useState(true);

  const noNav = ['/login', '/register'];

  useEffect(() => {
    setNavBarVisible(noNav.includes(router.pathname));
  });

  useEffect(() => {
    const firstLogin = async () => {
      const firstLogin = localStorage.getItem('firstLogin');
      if (firstLogin) {
        const res = await postData('user/accessToken', {
          rf_token: Cookies.get('refreshtoken'),
        });
        if (res.err) localStorage.removeItem('firstLogin');
        else {
          dispatch(
            setAuth({
              token: res.access_token,
              user: res.user,
            })
          );
        }
      }
    };
    firstLogin();
  }, []);

  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (Cookies.get('refreshtoken') === undefined) {
      router.push('/login');
    }
  }, [auth]);
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
