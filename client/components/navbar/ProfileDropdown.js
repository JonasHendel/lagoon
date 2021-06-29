import { Fragment } from 'react';
import Link from 'next/link';
import Cookie from 'js-cookie';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDown } from 'react-feather';

import { useContext } from 'react';

import { DataContext } from '../../store/GlobalState';
import { useRouter } from 'next/router';

const ProfileDropdown = ({ classNames }) => {
  const { state, dispatch } = useContext(DataContext);

  const router = useRouter();

  const { auth } = state;

  return (
    <Menu as="div" className="mr-10 relative">
      {({ open }) => (
        <>
          <div>
            <Menu.Button className="mr-5 p-1 text-gray-400 focus:outline-none hover:text-gray-900">
              <span className="sr-only">Open user menu</span>
              <div className="flex items-center">
                <img src="./icon.svg" className="h-6 mr-4" />
                <p className="mr-2">Jonas Hendel</p>
                <ChevronDown />
              </div>
            </Menu.Button>
          </div>
          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95">
            <Menu.Items
              static
              className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <Link href="/profile">
                    <a className="hover:bg-gray-100 block px-4 py-2 text-sm text-gray-700">
                      Your Profile
                    </a>
                  </Link>
                )}
              </Menu.Item>
              {({ active }) => auth.user.role === 'user' && adminRouter()}
              <Menu.Item>
                {({ active }) => (
                  <a className="hover:bg-gray-100 block px-4 py-2 text-sm text-gray-700">
                    Sign out
                  </a>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};

export default ProfileDropdown;
