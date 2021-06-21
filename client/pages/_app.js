import '../styles/global.scss';

import Layout from '../components/Layout';

import { DataProvider } from '../store/GlobalState';

import { useRouter } from 'next/router';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {

	return (
		<>
			<meta
				name='viewport'
				content='width=device-width, initial-scale=1.0'
			/>
			<DataProvider>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</DataProvider>
		</>
	);
}

export default MyApp;
