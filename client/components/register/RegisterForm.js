import React, { useState, useEffect } from 'react';
import { patchData } from '../../utils/fetchData';
import {useRouter} from 'next/router'

const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const RegisterForm = ({user, setUser}) => {
  const router = useRouter()

  const handleChange = (e) => {
    const { value, name } = e.target;
    setUser({ ...user, [name]: value });
  };

  const registerUser = (e) => {
    e.preventDefault()
    if (validateEmail(user.email)) {
      patchData('user/register', user).then((res) => {
        console.log(res)
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
    <div>
      <h1>Register</h1>
      <p>{user.name}</p>
      <p>{user.grade}</p>
      <form onSubmit={(e)=>registerUser(e)}>
        <input
          type="email"
          name="email"
          value={user.email}
          placeholder="E-mail"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          value={user.password}
          placeholder="Password"
          onChange={handleChange}
        />
        <input
          type="password"
          name="cf_password"
          value={user.cf_password}
          placeholder="Confirm password"
          onChange={handleChange}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterForm;