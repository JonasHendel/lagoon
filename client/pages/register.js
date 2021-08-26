import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from '@/styles/modules/Register.module.scss';

import AuthCode from '@/components/register/AuthCode';
import { postData } from '@/utils/fetchData';
import { useDispatch } from 'react-redux';
import { error } from '@/store/features/notifySlice';
import RegisterCode from '@/components/register/RegisterCode';
import RegisterForm from '@/components/register/RegisterForm';

const Register = () => {
  const [isCodeApproved, setIsCodeApproved] = useState(false);
  const [user, setUser] = useState({});
  return (
    <div>
      {/* {!isCodeApproved && (
        <RegisterCode setIsCodeApproved={setIsCodeApproved} setUser={setUser} />
      )} */}
      {/* {isCodeApproved && user && <RegisterForm user={user} setUser={setUser} />} */}
      <RegisterForm user={user} setUser={setUser}/>
    </div>
  );
};

export default Register;
