import React, { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Cookie from 'js-cookie';
import { useRouter } from 'next/router';

import Input from './../components/core/Input';
import Button from './../components/core/Button';
import styles from '../styles/modules/Login.module.scss';
import { Box } from 'react-feather';

//Project files
import { DataContext } from '../store/GlobalState';
import { postData } from '../utils/fetchData';

const Login = () => {
  const initialState = { email: '', password: '' };
  const [userData, setUserData] = useState(initialState);
  const { email, password } = userData;

  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;

  const router = useRouter();

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    dispatch({ type: 'NOTIFY', payload: {} });
  };

  useEffect(() => {
    if (Object.keys(auth).length !== 0) router.push('/');
  }, [auth]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch({ type: 'NOTIFY', payload: { loading: true } });

    const res = await postData('user/login', userData);

    if (res.err) {
      return dispatch({ type: 'NOTIFY', payload: { error: res.err } });
    }

    dispatch({ type: 'NOTIFY', payload: { success: res.msg } });
    dispatch({
      type: 'AUTH',
      payload: {
        token: res.access_token,
        user: res.user,
      },
    });

    Cookie.set('refreshtoken', res.refresh_token, {
      path: '',
      expires: 7,
    });
    localStorage.setItem('firstLogin', true);
    router.back();
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
        <div className={styles.login}>
          <div className={styles.header}>
            <img src="/logo.png" />
            <span>Lagoon</span>
          </div>
          <div className={styles.inputs}>
            <label>
              E-Mail
              <Input type="email" onChange={handleChangeInput} name="email" value={email} placeholder="example@domain.com" />
            </label>
            <label>
              Password
              <Input type="password" onChange={handleChangeInput} name="password" value={password} placeholder="Password" />
            </label>
          </div>
          <div className={styles.actions}>
            <Button type="primary" onClick={handleSubmit}>Sign in</Button>

            <div className={styles.register}>
              New here?
              <Link href="/register">
                <a>Create an account</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
