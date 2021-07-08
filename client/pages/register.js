import React, { useState, useEffect } from 'react';
import { patchData } from '../utils/fetchData';
import styles from '../styles/modules/Register.module.scss';

import Input from './../components/core/Input';
import AuthCode from './../components/auth/AuthCode';

const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const Register = () => {
  const initialState = {
    email: '',
    code: '',
    password: '',
    cf_password: '',
  };
  const [user, setUser] = useState(initialState);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setUser({ ...user, [name]: value });
  };

  const registerUser = () => {
    if (validateEmail(user.email)) {
      patchData('user/register', user).then((res) => {
        if (res.err) {
          console.log(res.err);
        } else {
          console.log(res);
        }
      });
    } else {
      console.log('Email is invalid');
    }
  };

  return (
    <div>
      <div className={styles.card}>
        <div className={styles.welcome}>
          <div className={styles.cover}>
            <img src="./intro.jpg" />
          </div>
          <div className={styles.content}>
            <div className={styles.welcomeMessage}>
              <h1>Welcome to Lagoon!</h1>
              <span>
                To get started enter the code given to you by your teacher in
                the fields below.
              </span>
            </div>
          </div>
          <div className={styles.code}>
            <span>Registration Code</span>
            <AuthCode />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
