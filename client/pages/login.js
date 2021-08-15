import React, { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Cookie from 'js-cookie';
import { useRouter } from 'next/router';

import Input from './../components/core/Input';
import Button from './../components/core/Button';
import styles from '../styles/modules/Login.module.scss';
import { Box } from 'react-feather';
import { success, error } from '../store/features/notifySlice';

//Project files
import { useSelector, useDispatch } from 'react-redux';
import { setAuth } from '../store/features/authSlice';
import { postData } from '../utils/fetchData';

const Login = () => {
  const initialState = { email: '', password: '' };
  const [userData, setUserData] = useState(initialState);
  const { email, password } = userData;

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const router = useRouter();

  

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({ ...prevUserData, [name]: value }));
    // dispatch({ type: 'NOTIFY', payload: {} });
  };

  useEffect(() => {
    if (auth.token) router.push('/');
  }, [auth]);

  const login = async () => {
    // dispatch({ type: 'NOTIFY', payload: { loading: true } });

    const res = await postData('user/login', userData);

    if (res.err) {
      return dispatch(error(res.err));
    }

    dispatch(
      setAuth({
        token: res.access_token,
        user: res.user,
      })
    );

    dispatch(success('Login successful'));

    Cookie.set('refreshtoken', res.refresh_token, {
      path: '',
      expires: 7,
    });
    localStorage.setItem('firstLogin', true);
    localStorage.setItem('accessToken', res.access_token);
    router.push('/');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    login();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      login();
    }
  };

  return (
    <div>
      <Head>
        <title>Lagoon Login</title>
      </Head>

      <div className={styles.card}>
        <div className={styles.decor}>
          <img src="/cover.jpg" />
        </div>
        <form className={styles.login} onSubmit={handleSubmit}>
          <div className={styles.header}>
            <img src="/logo.svg" />
            <span>Lagoon</span>
          </div>
          <div className={styles.inputs}>
            <label>
              E-Mail
              <Input
                type="email"
                onChange={handleChangeInput}
                name="email"
                value={email}
                placeholder="example@domain.com"
              />
            </label>
            <label>
              Password
              <Input
                type="password"
                onChange={handleChangeInput}
                name="password"
                value={password}
                placeholder="Password"
              />
            </label>
          </div>
          <div className={styles.actions}>
            <div className={styles.button}>
              <Button class="primary" type="submit" className={styles.button1}>
                Sign in
              </Button>
            </div>

            <div className={styles.register}>
              New here?
              <Link href="/register">
                <a>Create an account</a>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
