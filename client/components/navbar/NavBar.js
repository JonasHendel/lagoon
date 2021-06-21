//NPM
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Disclosure } from '@headlessui/react';
import styles from '../../styles/modules/NavBar.module.scss';

import { Menu, X, LogIn } from 'react-feather';

//Project Files
import { DataContext } from '../../store/GlobalState';
import ProfileDropdown from './ProfileDropdown';

const navigation = [
	{ name: 'Dashboard', href: '/', current: false },
	{ name: 'Courses', href: '/courses', current: false },
	{ name: 'Calendar', href: '/calendar', current: false },
	{ name: 'Messages', href: '/messages', current: false },
];

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

export default function NavBar() {
	const router = useRouter();

	const isActive = (href) => {
		if (href == router.pathname) {
			return styles.active;
		} else {
			return styles.navItem;
		}
	};

	const { state } = useContext(DataContext);

	const { auth, cart } = state;
	return (
		<Disclosure as='nav'>
			{({ open }) => (
				<>
					<div className={styles.container}>
						<div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
							{/* Mobile menu button*/}
							<Disclosure.Button className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
								<span className='sr-only'>Open main menu</span>
								{open ? (
									<X
										className='block h-8 w-8'
										aria-hidden='true'
									/>
								) : (
									<Menu
										className='block h-8 w-8'
										aria-hidden='true'
									/>
								)}
							</Disclosure.Button>
						</div>
						<div className='flex items-center justify-center md:items-stretch md:justify-start'>
							<Link href='/'>
								<div className='flex-shrink-0 flex items-center'>
									<img
										className='block lg:hidden h-14 w-auto'
										src='/logo.png'
										alt='Lagoon Logo'
									/>
									<img
										className='mx-10 hidden lg:block h-12 w-auto'
										src='/logo.png'
										alt='Lagoon Logo'
									/>
								</div>
							</Link>
							<div className='hidden md:block md:ml-6'>
								<div className='flex space-x-4 h-20 items-center'>
									{navigation.map((item) => (
										<Link href={item.href} key={item.name}>
											<a
												className={classNames(
													isActive(item.href),
													'px-3 py-2 rounded-md text-lg font-medium whitespace-nowrap'
												)}
												aria-current={
													item.current
														? 'page'
														: undefined
												}>
												{item.name}
											</a>
										</Link>
									))}
								</div>
							</div>
						</div>
						<div className='absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0'>
							<ProfileDropdown classNames={classNames} />
						</div>
					</div>

					<Disclosure.Panel className='md:hidden'>
						<div className='px-2 pt-2 pb-3 space-y-1'>
							{navigation.map((item) => (
								<Link href={item.href} key={item.name}>
									<a
										className={classNames(
											item.current
												? 'bg-gray-900 text-white'
												: 'text-gray-300 hover:text-gray-600',
											'block px-3 py-2 rounded-md text-base font-medium'
										)}
										aria-current={
											item.current ? 'page' : undefined
										}>
										{item.name}
									</a>
								</Link>
							))}
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	);
}
