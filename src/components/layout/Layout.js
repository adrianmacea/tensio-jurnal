import { MdOutlineDoubleArrow as ArrowsIco } from 'react-icons/md';

import styles from './Layout.module.css';
import LeftNavigation from './LeftNavigation';
import { useAuthContext } from '../../store/auth-context';
import { usePanelsContext } from '../../store/panels-context';

const Layout = (props) => {
  const { isLoggedIn } = useAuthContext();
  const { isNavOpen, setIsNavOpen, windowWidth } = usePanelsContext();
  const isWindowWidth = windowWidth > 1024;

  const expandNavHandler = () => {
    setIsNavOpen((prevIsNavOpen) => !prevIsNavOpen);
  };

  return (
    <>
      <div className={styles['background']}>
        <div
          className={`${styles['background--top']} ${
            !isLoggedIn ? styles['landing-page--background--top'] : ''
          }
          `}
        >
          <div className={styles['background--top-center']}></div>
        </div>
        <div className={styles['background--center']}></div>
      </div>

      {isLoggedIn && (
        <div className={styles['container']}>
          <div className={styles['container--nav']}>
            <LeftNavigation />
          </div>

          <div className={styles['container--main']}>
            <div
              onClick={expandNavHandler}
              className={styles['container--arrows-div']}
            >
              <ArrowsIco className={isNavOpen ? 'rotate180' : ''} />
            </div>            
            <div className={isWindowWidth ? '' : styles['scroll-to-bottom-fix']}>
              {props.children}
            </div>
          </div>
        </div>
      )}

      {!isLoggedIn && (
        <div className={styles['landing-page--container']}>
          {props.children}
        </div>
      )}
    </>
  );
};

export default Layout;
