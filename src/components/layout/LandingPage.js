import { NavLink, Outlet } from 'react-router-dom';

import styles from './LandingPage.module.css';
import image from '../../assets/landing-stripe.jpg';
import Logo from '../../assets/Logo';
import { usePanelsContext } from '../../store/panels-context';
import { R_LANDING, R_SIGNUP, R_SIGNIN } from '../../helpers/global-constants';

const LandingPage = () => {
  const { windowWidth } = usePanelsContext();

  let logoSize = 28;
  let headline = 'Tu ești în control.';
  switch (true) {
    case windowWidth > 1287:
      logoSize = 44;
      break;
    case windowWidth > 1199:
      logoSize = 43;
      break;
    case windowWidth > 959:
      logoSize = 33;
      break;
    case windowWidth < 528:
      headline = 'Ești în control.';
      break;
    // no default
  }

  return (
    <>
      <header className={styles['lp-header--container']}>
        <NavLink to={R_LANDING} className={styles['lp-header--logo-box']}>
          <Logo
            className={styles['lp-header--logo-icon']}
            logoSize={logoSize}
          />
          <p className={styles['lp-header--logo-text']}>
            Tensio<span>Jurnal</span>
          </p>
        </NavLink>
        <ul className={styles['lp-header--nav-ul']}>
          <li className={styles['lp-header--nav-li']}>
            <NavLink
              to={`${R_LANDING}${R_SIGNUP}`}
              className={({ isActive }) => (isActive ? styles.active : '')}
            >
              Utilizator nou
            </NavLink>
          </li>
          <li className={styles['lp-header--nav-li']}>
            <NavLink
              to={`${R_LANDING}${R_SIGNIN}`}
              className={({ isActive }) => (isActive ? styles.active : '')}
            >
              Autentificare
            </NavLink>
          </li>
        </ul>
      </header>

      <div className={styles['lp--image-box']}>
        <img src={image} alt="Rafting" className={styles['lp--image']} />
        <p className={styles['lp--image-headline']}>{headline}</p>
      </div>

      <main className={styles['lp--main']}>
        <Outlet />
      </main>
    </>
  );
};

export default LandingPage;
