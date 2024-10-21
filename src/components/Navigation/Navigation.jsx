import clsx from 'clsx';
import { Link, NavLink } from 'react-router-dom';

import css from './Navigation.module.css';

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

const Header = () => {
  return (
    <header className={css.header}>
      <div className={css.navWrapper}>
        <div className={css.logoWrapper}>
          <Link to="/">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M21.89 10.21c-1.31-.66-2.18.26-3.28 1.09a4 4 0 0 0-1.32-1.57A5 5 0 1 0 10 9H8.44a4 4 0 1 0-6.06 1C.57 11.58 1 13.08 1 19a4 4 0 0 0 4 4h10a4 4 0 0 0 3.61-2.3l1.19.9A2 2 0 0 0 23 20v-8a2 2 0 0 0-1.11-1.79zM11 6a3 3 0 1 1 3 3 3 3 0 0 1-3-3zM3 7a2 2 0 1 1 2 2 2 2 0 0 1-2-2zm12 14H5a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2zm6-1-2-1.5v-5l2-1.5z"
                data-name="Camera roll"
              />
            </svg>
          </Link>
        </div>
        <nav className={css.nav}>
          <NavLink to="/" className={buildLinkClass}>
            Home
          </NavLink>
          <NavLink to="/movies" className={buildLinkClass}>
            Movies
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
