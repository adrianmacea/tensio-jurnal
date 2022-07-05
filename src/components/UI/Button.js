import cssStyles from './Button.module.css';
import { B_CANCEL, B_DARK, B_TEXT } from '../../helpers/global-constants';

const Button = (props) => {
  const { type, text, onClick, className, styles } = props;

  let btnType = '';

  switch (styles) {
    case B_CANCEL:
      btnType = cssStyles[B_CANCEL];
      break;
    case B_TEXT:
      btnType = cssStyles[B_TEXT];
      break;
    case B_DARK:
      btnType = cssStyles[B_DARK];
      break;
    default:
      btnType = cssStyles.btn;
  }

  return (
    <button
      type={type ? type : 'button'}
      className={`${className} ${btnType}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
