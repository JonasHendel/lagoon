import { useRouter } from 'next/router';
import Link from 'next/link';
import Account from './Account';
import CoursesDropdown from './CoursesDropdown';
import styles from '../../styles/modules/NavBar.module.scss';
import { useSelector } from 'react-redux';

let navItems = [
  { name: 'Dashboard', href: '/' },
  { name: 'Courses', href: '/courses' },
  { name: 'Calendar', href: '/calendar' },
  { name: 'Messages', href: '/messages' },
];

export default function navbar() {
  // const { state, dispatch } = useContext(DataContext);
  // const { auth } = state;

  const auth = useSelector((state) => state.auth);
  const router = useRouter();

  const isActive = (href) => {
    const path = router.pathname.split('/')
    if (href === `/${path[1]}`) {
      return styles.active;
    } else {
      return styles.inactive;
    }
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.navigation}>
        <img className={styles.logo} src="/logo.png" alt="Lagoon Logo" />
        <div className={styles.navItems}>
          {navItems.map((navItem) => (
            <>
              {navItem.name === 'Courses' ? (
                <CoursesDropdown />
              ) : (
                <Link href={navItem.href} key={navItem.href}>
                  <span
                    className={`${styles.navItem} ${isActive(navItem.href)}`}>
                    {navItem.name}
                  </span>
                </Link>
              )}
            </>
          ))}
        </div>
      </div>
      {auth.token.length === 0 ? (
        <Link href="/login">
          <a>Login</a>
        </Link>
      ) : (
        <Account />
      )}
    </div>
  );
}
