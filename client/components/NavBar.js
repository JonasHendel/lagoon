//NPM
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Disclosure } from '@headlessui/react';

import { Menu, X, LogIn } from 'react-feather';


//Project Files
import { DataContext } from '../store/GlobalState';
// import ProfileDropdown from './ProfileDropdown';
// import AdminDropdown from './AdminDropwdown';

const navigation = [
	{ name: 'Dashboard', href: '/', current: false },
	{ name: 'Calendar', href: '/course', current: false },
	{ name: 'Nettbutikk', href: '/shop', current: false },
	{ name: 'Arrangementer', href: '/events', current: false },
	{ name: 'Oppskrifter', href: '/recipes', current: false },
];

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

export default function NavBar() {
	const router = useRouter();

	const isActive = (href) => {
		if (href == router.pathname) {
			return 'bg-gray-900 text-white';
		} else {
			return 'text-gray-300 hover:bg-gray-700 hover:text-white';
		}
	};

	const { state } = useContext(DataContext);

	const { auth, cart } = state;

	return (
		<Disclosure as='nav' className='bg-gray-800 sticky top-0 z-20'>
			{({ open }) => (
				<>
					<div className=''>
						<div className='relative flex items-center justify-between h-20'>
							<div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
								{/* Mobile menu button*/}
								<Disclosure.Button className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
									<span className='sr-only'>
										Open main menu
									</span>
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
							<div className='flex-1 flex items-center justify-center md:items-stretch md:justify-start'>
              <Link href="/">
								<div className='flex-shrink-0 flex items-center'>
									<img
										className='block lg:hidden h-16 w-auto'
										src='/logo.png'
										alt='Francesco Solimeo'
									/>
									<img
										className='hidden lg:block h-14 w-auto'
										src='/logo.png'
										alt='Francesco Solimeo'
									/>
								</div>
              </Link>
								<div className=' hidden md:block md:ml-6'>
									<div className='flex space-x-4 h-20 items-center'>
										{navigation.map((item) => (
											<Link
												href={item.href}
												key={item.name}>
												<a
													className={classNames(
														isActive(item.href),
														'px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap'
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
								{/* Profile dropdown */}
										{/* <ProfileDropdown
											classNames={classNames}
										/>
										{auth.user.role === 'admin' && (
											<AdminDropdown
												classNames={classNames}
											/>
										)}
								)} */}
							</div>
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
												: 'text-gray-300 hover:bg-gray-700 hover:text-white',
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