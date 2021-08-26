import React from 'react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import NavBar from './navbar/NavBar';
import Notify from './core/Notify';
import CalendarEditLesson from './calendar/EditLesson';
import CalendarAdd from './calendar/AddEvent';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { setAuth } from '@/store/features/authSlice';
import { postData } from '@/utils/fetchData';

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
      console.log('first login');
      const firstLogin = localStorage.getItem('firstLogin');
      if (firstLogin) {
        const res = await postData('user/accessToken', {
          rf_token: Cookies.get('refreshtoken'),
        });
        if (res.err) localStorage.removeItem('firstLogin');
        else {
          localStorage.setItem('accessToken', res.access_token);
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

  const authToken = useSelector((state) => state.auth.token);

  const auth = useSelector((state) => state.auth);


  return (
    <div>
          <Notify />
      {!navBarVisible && (
        <div>
          <CalendarAdd />
          <CalendarEditLesson />
          <NavBar />
        </div>
      )}
      {children}
    </div>
  );
};

export default Layout;
