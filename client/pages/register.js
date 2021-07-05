import React, { useState, useEffect } from 'react';
import { patchData } from '../utils/fetchData';

const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

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
    if(validateEmail(user.email)){
      patchData('user/register', user).then((res)=>{
        if(res.err){
          console.log(res.err)
        }else{
          console.log(res)
        }
      });
    }else {
      console.log('Email is invalid')
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={registerUser}>
        <input
          type="email"
          name="email"
          value={user.email}
          placeholder="E-mail"
          onChange={handleChange}
        />
        <input
          name="code"
          value={user.code}
          placeholder="Code"
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

export default Register;
