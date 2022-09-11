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
  S_SIS_IZOLATA,
  SIS_VALUES,
  DIA_VALUES,
  L_OPTIM,
  L_NORMAL
} from '../../helpers/global-constants';

const SIS = 'Sis.';
const DIA = 'Dia.';
const EMDASH = '—'; //&#8212;
const SMALLER = '<'; //&#60;
const GREATER = '>'; //&#62;

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
                {SIS} {SMALLER} {SIS_VALUES[0]} {EMDASH} {DIA} {SMALLER}{' '}
                {DIA_VALUES[0]}
              </p>
            )}
            <div
              className={`${styles['color-sum--circle']} bg${S_OPTIM}`}
            ></div>
            <p className={styles['colors-sum--name']}>{L_OPTIM}</p>
            {isDetailed && (
              <p className={styles['colors-sum--description']}>
                {SIS} {SIS_VALUES[0]}-{SIS_VALUES[1]} {EMDASH} {DIA}{' '}
                {DIA_VALUES[0]}-{DIA_VALUES[1]}
              </p>
            )}
            <div
              className={`${styles['color-sum--circle']} bg${S_NORMAL}`}
            ></div>
            <p className={styles['colors-sum--name']}>{L_NORMAL}</p>
            {isDetailed && (
              <p className={styles['colors-sum--description']}>
                {SIS} {SIS_VALUES[1]}-{SIS_VALUES[2]} {EMDASH} {DIA}{' '}
                {DIA_VALUES[1]}-{DIA_VALUES[2]}
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
                {SIS} {SIS_VALUES[2]}-{SIS_VALUES[3]} {EMDASH} {DIA}{' '}
                {DIA_VALUES[2]}-{DIA_VALUES[3]}
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
                {SIS} {SIS_VALUES[3]}-{SIS_VALUES[4]} {EMDASH} {DIA}{' '}
                {DIA_VALUES[3]}-{DIA_VALUES[4]}
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
                {SIS} {SIS_VALUES[4]}-{SIS_VALUES[5]} {EMDASH} {DIA}{' '}
                {DIA_VALUES[4]}-{DIA_VALUES[5]}
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
                {SIS} {GREATER} {SIS_VALUES[5]} {EMDASH} {DIA} {GREATER}{' '}
                {DIA_VALUES[5]}
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
                {SIS} {GREATER} {SIS_VALUES[3]} {EMDASH} {DIA} {SMALLER}{' '}
                {DIA_VALUES[3]}
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
