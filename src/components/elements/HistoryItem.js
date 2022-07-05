import { MdDateRange as DateIco } from 'react-icons/md';
import { MdAccessTime as TimeIco } from 'react-icons/md';
import { MdOutlineFrontHand as ArmIco } from 'react-icons/md';
import { MdOutlineDeleteForever as DeleteIco } from 'react-icons/md';
import { MdOutlineComment as CommentIco } from 'react-icons/md';

import styles from './HistoryItem.module.css';
import Card from '../UI/Card';
import useHyperColorsStateless from '../../hooks/use-hyper-colors-stateless';
import { usePanelsContext } from '../../store/panels-context';
import { useModalContext } from '../../store/modal-context';
import { M_DELETE_READING } from '../../helpers/global-constants';

const HistoryItem = (props) => {
  const {
    id,
    sis,
    dia,
    pulse,
    weight,
    date,
    time,
    arm,
    comment,
    pulsePressure,
    medianPressure
  } = props;
  const { windowWidth } = usePanelsContext();
  const { getHyperColors } = useHyperColorsStateless();
  const { setModalData, showModal } = useModalContext();

  const showIcons = windowWidth > 360 ? true : false;

  const { sisColor, diaColor, hyperColor } = getHyperColors(sis, dia);

  const deleteItemHandler = () => {
    setModalData(`${id}`);
    showModal(M_DELETE_READING);
  };

  return (
    <Card className={`${styles['history-item']} bg${hyperColor}`}>
      <div className={styles['history-item--top']}>
        <span>
          <p className={`${styles['hist-item--top-val-big']} c${sisColor}`}>
            {sis}
          </p>
          <p className={styles['hist-item--label']}>Sis</p>
        </span>
        <span>
          <p className={`${styles['hist-item--top-val-big']} c${diaColor}`}>
            {dia}
          </p>
          <p className={styles['hist-item--label']}>Dia</p>
        </span>
        <span>
          <p className={styles['hist-item--top-val']}>{pulse}</p>
          <p className={styles['hist-item--label']}>P</p>
        </span>
        <span>
          <p className={styles['hist-item--top-val']}>{pulsePressure}</p>
          <p className={styles['hist-item--label']}>PP</p>
        </span>
        <span>
          <p className={styles['hist-item--top-val']}>{medianPressure}</p>
          <p className={styles['hist-item--label']}>PAM</p>
        </span>
        <span>
          <p className={styles['hist-item--top-val']}>{weight}</p>
          <p className={styles['hist-item--label']}>Kg</p>
        </span>
      </div>
      <div className={styles['history-item--mid-bottom']}>
        <span className={styles['history-item--middle']}>
          <span>
            {showIcons && <DateIco className={styles['hist-item--ico']} />}
            <p className={styles['hist-item--mid-val']}>{date}</p>
          </span>
          <span>
            {showIcons && <TimeIco className={styles['hist-item--ico']} />}
            <p className={styles['hist-item--mid-val']}>{time}</p>
          </span>
          <span>
            {showIcons && <ArmIco className={styles['hist-item--ico']} />}
            <p className={styles['hist-item--mid-val']}>{arm}</p>
          </span>
          <DeleteIco
            onClick={deleteItemHandler}
            className={`${styles['hist-item--ico']} ${styles['hist-item--delete-ico']}`}
          />
        </span>
        {!!comment && (
          <span className={styles['history-item--bottom']}>
            {showIcons && (
              <div>
                <CommentIco className={styles['hist-item--ico']} />
              </div>
            )}
            <p className={styles['hist-item--comment']}>{comment}</p>
          </span>
        )}
      </div>
    </Card>
  );
};

export default HistoryItem;
