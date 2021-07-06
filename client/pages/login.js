import React, { useState, useEffect, useContext } from 'react'
import Head from 'next/head';
import Link from 'next/link';
import Cookie from 'js-cookie';
import { useRouter } from 'next/router';

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

			<form
				onSubmit={handleSubmit}>
				<h1 className='font-bold text-xl'>Sign in</h1>
				<div> 
					<input
						type='text'
						name='email'
						value={email}
						onChange={handleChangeInput}
						placeholder='Email'
					/>
					<input
						type='password'
						name='password'
						value={password}
						onChange={handleChangeInput}
						placeholder='Password'
					/>
				</div>
				<div> 
					<button
						type='submit'>
						Login
					</button>
					<div>
						<a>You don't have an account? </a>
						<Link href='/register'>
							<a>Register</a>
						</Link>
					</div>
				</div>
			</form>
		</div>
	);
}

export default Login
