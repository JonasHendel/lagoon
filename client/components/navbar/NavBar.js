import { useRouter } from 'next/router';
import Link from 'next/link';
import Account from './Account';
import styles from '../../styles/modules/NavBar.module.scss';

let navItems = [
  { name: 'Dashboard', href: '/' },
  { name: 'Courses', href: '/courses' },
  { name: 'Calendar', href: '/calendar' },
  { name: 'Messages', href: '/messages' },
];

export default function navbar() {
  const router = useRouter();

  const isActive = (href) => {
    if (href === router.pathname) {
      return styles.active;
    }
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.navigation}>
        <img className={styles.logo} src="/logo.png" alt="Lagoon Logo" />
        <div className={styles.navItems}>
          {navItems.map((navItem) => (
            <Link href={navItem.href} key={navItem.href}>
              <span className={`${styles.navItem} ${isActive(navItem.href)}`}>
                {navItem.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
      <div class={styles.account}>
        <Account />
      </div>
    </div>
  );
}
