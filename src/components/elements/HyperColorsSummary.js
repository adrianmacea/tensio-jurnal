import { MdTransitEnterexit as ArrowIco } from 'react-icons/md';

import styles from './HyperColorsSummary.module.css';
import Card from '../UI/Card';
import Button from '../UI/Button';
import { usePanelsContext } from '../../store/panels-context';
import {
  B_DARK,
  S_GRAD_1,
  S_GRAD_2,
  S_GRAD_3,
  S_HIPO,
  S_INALT,
  S_NORMAL,
  S_OPTIM,
  S_SIS_IZOLATA
} from '../../helpers/global-constants';

const HyperColorsSummary = () => {
  const {
    isColorsOpened: isOpened,
    isColorsDetailed: isDetailed,
    toggleColorsOpened: toggleOpened,
    toggleColorsDetailed: toggleDtailed
  } = usePanelsContext();

  const toggleOpenedHandler = () => {
    toggleOpened();
  };
  const toggleDetailedHandler = () => {
    toggleDtailed();
  };

  return (
    <Card className={styles['colors-sum--card']}>
      {!isOpened && (
        <>
          <div className={`${styles['colors-sum--line']} bg${S_HIPO}`}></div>
          <div className={`${styles['colors-sum--line']} bg${S_OPTIM}`}></div>
          <div className={`${styles['colors-sum--line']} bg${S_NORMAL}`}></div>
          <div className={`${styles['colors-sum--line']} bg${S_INALT}`}></div>
          <div className={`${styles['colors-sum--line']} bg${S_GRAD_1}`}></div>
          <div className={`${styles['colors-sum--line']} bg${S_GRAD_2}`}></div>
          <div className={`${styles['colors-sum--line']} bg${S_GRAD_3}`}></div>
          <div
            className={`${styles['colors-sum--line']} bg${S_SIS_IZOLATA}`}
          ></div>
        </>
      )}

      {isOpened && (
        <>
          <h4 className={styles['colors-sum--title']}>
            {isDetailed ? 'Tip tensiune arterială:' : 'Legenda:'}
          </h4>
          <div className={styles['colors-sum--container-grid']}>
            <div className={`${styles['color-sum--circle']} bg${S_HIPO}`}></div>
            <p className={styles['colors-sum--name']}>
              {isDetailed ? 'Hipotensiune' : 'Hipo-t.'}
            </p>
            {isDetailed && (
              <p className={styles['colors-sum--description']}>
                Sis. &#60; 90 &#8212; Dia. &#60; 60
              </p>
            )}
            <div
              className={`${styles['color-sum--circle']} bg${S_OPTIM}`}
            ></div>
            <p className={styles['colors-sum--name']}>Optimă</p>
            {isDetailed && (
              <p className={styles['colors-sum--description']}>
                Sis. 90-120 &#8212; Dia. 60-80
              </p>
            )}
            <div
              className={`${styles['color-sum--circle']} bg${S_NORMAL}`}
            ></div>
            <p className={styles['colors-sum--name']}>Normală</p>
            {isDetailed && (
              <p className={styles['colors-sum--description']}>
                Sis. 120-129 &#8212; Dia. 80-84
              </p>
            )}
            <div
              className={`${styles['color-sum--circle']} bg${S_INALT}`}
            ></div>
            <p className={styles['colors-sum--name']}>
              {isDetailed ? 'Normal-înaltă' : 'Înaltă'}
            </p>
            {isDetailed && (
              <p className={styles['colors-sum--description']}>
                Sis. 130-139 &#8212; Dia. 85-89
              </p>
            )}
            <div
              className={`${styles['color-sum--circle']} bg${S_GRAD_1}`}
            ></div>
            <p className={styles['colors-sum--name']}>
              {isDetailed ? 'Hipertensiune grad 1' : 'Hiper-t. 1'}
            </p>
            {isDetailed && (
              <p className={styles['colors-sum--description']}>
                Sis. 140-159 &#8212; Dia. 90-99
              </p>
            )}
            <div
              className={`${styles['color-sum--circle']} bg${S_GRAD_2}`}
            ></div>
            <p className={styles['colors-sum--name']}>
              {isDetailed ? 'Hipertensiune grad 2' : 'Hiper-t. 2'}
            </p>
            {isDetailed && (
              <p className={styles['colors-sum--description']}>
                Sis. 160-179 &#8212; Dia. 100-109
              </p>
            )}
            <div
              className={`${styles['color-sum--circle']} bg${S_GRAD_3}`}
            ></div>
            <p className={styles['colors-sum--name']}>
              {isDetailed ? 'Hipertensiune grad 3' : 'Hiper-t. 3'}
            </p>
            {isDetailed && (
              <p className={styles['colors-sum--description']}>
                Sis. &#62; 180 &#8212; Dia. &#62; 110
              </p>
            )}
            <div
              className={`${styles['color-sum--circle']} bg${S_SIS_IZOLATA}`}
            ></div>
            <p className={styles['colors-sum--name']}>
              {isDetailed ? 'HT. sistolică izolată' : 'Sis-izolată'}
            </p>
            {isDetailed && (
              <p className={styles['colors-sum--description']}>
                Sis. &#62; 140 &#8212; Dia. &#60; 90
              </p>
            )}
          </div>
          <Button
            text={isDetailed ? 'Mai puțin' : 'Mai mult'}
            onClick={toggleDetailedHandler}
            styles={B_DARK}
          />
        </>
      )}

      <ArrowIco
        className={`${styles['colors-sum--ico']} ${
          isOpened ? 'rotate180' : ''
        }`}
        onClick={toggleOpenedHandler}
      />
    </Card>
  );
};

export default HyperColorsSummary;
