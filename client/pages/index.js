import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment } from '../store/features/counterSlice';
import { setAuth } from '../store/features/authSlice';
import Cookies from 'js-cookie';

export default function Home() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  return <div className="min-h-screen"></div>;
}
