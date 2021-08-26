import React, { useState, useEffect } from 'react';
import { patchData } from '@/utils/fetchData';
import { useRouter } from 'next/router';
import styles from '@/styles/modules/Register.module.scss';
import Head from 'next/head';

const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const RegisterForm = ({ user, setUser }) => {
  const router = useRouter();

  const handleChange = (e) => {
    const { value, name } = e.target;
    setUser({ ...user, [name]: value });
  };

  const registerUser = (e) => {
    e.preventDefault();
    if (validateEmail(user.email)) {
      patchData('user/register', user).then((res) => {
        console.log(res);
        if (res.err) {
          console.error(res.err);
        } else {
          router.push('/login');
        }
      });
    } else {
      console.log('Email is invalid');
    }
  };

  return (
    <div className={styles.FormCard}>
      <Head>
        <title>Lagoon Regsiter</title>
      </Head>
      <div className={styles.decor}>
        <img src="/intro2.jpg" />
      </div>
      <form onSubmit={(e) => registerUser(e)} className={styles.RegisterForm}>
        <div className={styles.header}>
          <img src="/logo.svg" />
          <span>Lagoon</span>
        </div>
        <div className={styles.inputs}>
          <div className={styles.UserInfo}>
            <p>{user.name}Jonas Hendel</p>
            <p>{user.grade} Grade 12</p>
          </div>
          <label>
            Email
            <input
              className="input"
              type="email"
              name="email"
              value={user.email}
              placeholder="E-mail"
              onChange={handleChange}
            />
          </label>
          <label>
            Password
            <input
              className="input"
              type="password"
              name="password"
              value={user.password}
              placeholder="Password"
              onChange={handleChange}
            />
          </label>
          <label>
            Confirm Password
            <input
              className="input"
              type="password"
              name="cf_password"
              value={user.cf_password}
              placeholder="Confirm password"
              onChange={handleChange}
            />
          </label>
        </div>
        <button className="button primary" type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
