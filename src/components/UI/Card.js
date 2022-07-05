import styles from './Card.module.css';
import { usePanelsContext } from '../../store/panels-context';
import { useAuthContext } from '../../store/auth-context';

const Card = (props) => {
  const { isNavOpen } = usePanelsContext();
  const { isLoggedIn } = useAuthContext();

  const isNavState = isNavOpen && isLoggedIn ? styles['if-nav-opened'] : styles['if-nav-closed'];

  return (
    <div
      className={`${styles.card} ${isNavState} ${props.className}`}
    >
      {props.children}
    </div>
  );
};

export default Card;
