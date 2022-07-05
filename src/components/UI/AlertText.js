import styles from './AlertText.module.css';
import { S_DEFAULT } from '../../helpers/global-constants';

const AlertText = (props) => {
  const { text, color, small } = props;
  const messageText = text;
  const messageColor = color ? color : `c${S_DEFAULT}`;
  const messageSmall = small ? styles['alert-small'] : '';

  return (
    <h3 className={`${styles['alert-text']} ${messageColor} ${messageSmall}`}>
      {messageText}
    </h3>
  );
};

export default AlertText;
