import { MdOutlineDoubleArrow as ArrowsIco } from 'react-icons/md';

import styles from './Layout.module.css';
import LeftNavigation from './LeftNavigation';
import { useAuthContext } from '../../store/auth-context';
import { usePanelsContext } from '../../store/panels-context';
import { useCallback, useEffect, useRef } from 'react';

const Layout = (props) => {
  const { isLoggedIn } = useAuthContext();
  const { isNavOpen, setIsNavOpen, windowWidth, windowHeight, setNavWidth } =
    usePanelsContext();
  const isWindowWidth = windowWidth > 1024;
  const navRef = useRef(null);

  const measureNavWidth = useCallback(() => {
    const nav = navRef.current;
    if (nav)
      setTimeout(() => {
        setNavWidth(nav.getBoundingClientRect().width.toFixed(2));
      }, 1);
  }, [setNavWidth]);

  useEffect(() => {
    measureNavWidth();
  }, [measureNavWidth]);

  /* mobile vh fix */
  let vh = windowHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);

  const expandNavHandler = () => {
    setIsNavOpen((prevIsNavOpen) => !prevIsNavOpen);
    measureNavWidth();
  };

  return (
    <>
      {isLoggedIn && (
        <div className={styles['container']}>
          <nav ref={navRef} id="nav" className={styles['container--nav']}>
            <LeftNavigation />
          </nav>

          <main className={styles['container--main']}>
            <div
              onClick={expandNavHandler}
              className={styles['container--arrows-div']}
            >
              <ArrowsIco className={isNavOpen ? 'rotate180' : ''} />
            </div>
            <div
              className={isWindowWidth ? '' : styles['scroll-to-bottom-fix']}
            >
              {props.children}
            </div>
          </main>
        </div>
      )}

      {!isLoggedIn && (
        <>
          <div className={styles['landing-page--top']}></div>
          <div className={styles['landing-page--container']}>
            {props.children}
          </div>
        </>
      )}
    </>
  );
};

export default Layout;
