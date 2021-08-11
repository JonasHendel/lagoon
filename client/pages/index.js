import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setAuth } from '../store/features/authSlice';
import Cookies from 'js-cookie';
import withAuth from '../utils/withAuth';

const Home = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <div
      onClick={(e) => {
        console.log(e);
      }}
      className="min-h-screen">
      <h1>Lagoon</h1>
    </div>
  );
};

export default withAuth(Home);
