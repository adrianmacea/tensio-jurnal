import styles from './HyperIndicator.module.css';
import SvgHeart from '../../assets/SvgHeart';
import {
  S_GRAD_1,
  S_GRAD_2,
  S_GRAD_3,
  S_HIPO,
  S_INALT,
  S_NORMAL,
  S_OPTIM,
  S_PRIMARY,
  S_SIS_IZOLATA
} from '../../helpers/global-constants';

const HyperIndicator = (props) => {
  const { heartStyles, isInputBlank, isSisIzolata } = props;
  let barColor = '';
  if (isInputBlank) barColor = `bg${S_PRIMARY}`;
  if (isSisIzolata) barColor = `bg${S_SIS_IZOLATA}`;

  return (
    <div className={styles['hyper-indicator']}>
      <SvgHeart className={`${styles['hyper-ind--ico']} ${heartStyles}`} />
      <div className={`${styles['hypert-ind--bar']} ${barColor}`}>
        {!isSisIzolata && !isInputBlank && (
          <>
            <div className={`bg${S_HIPO}`}></div>
            <div className={`bg${S_OPTIM}`}></div>
            <div className={`bg${S_NORMAL}`}></div>
            <div className={`bg${S_INALT}`}></div>
            <div className={`bg${S_GRAD_1}`}></div>
            <div className={`bg${S_GRAD_2}`}></div>
            <div className={`bg${S_GRAD_3}`}></div>
          </>
        )}
      </div>
    </div>
  );
};

export default HyperIndicator;
