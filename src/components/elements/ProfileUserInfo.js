import { useNavigate } from 'react-router-dom';
import { MdOutlineAccountBox as UserIco } from 'react-icons/md';
import { MdOutlineCake as CakeIco } from 'react-icons/md';
import { MdOutlineModeEdit as EditIco } from 'react-icons/md';

import styles from './Profile.module.css';
import PageHeader from '../UI/PageHeader';
import SmallText from '../UI/SmallText';
import AlertText from '../UI/AlertText';
import Button from '../UI/Button';
import Line from '../UI/Line';
import useQueryUserInfo from '../../hooks/http-req/use-query-user-info';
import {
  B_TEXT,
  R_PROFILE,
  R_UPDATE_INFO,
  S_ALERT,
  S_PRIMARY
} from '../../helpers/global-constants';

const ProfileUserInfo = () => {
  const navigate = useNavigate();
  const { hasProfile, name, age } = useQueryUserInfo();
  const changeProfileHandler = () => {
    navigate(`${R_PROFILE}${R_UPDATE_INFO}`);
  };

  const introText = hasProfile
    ? 'Aceste date sunt vizibile în rapoartele generate de aplicație, fiind necesare medicului.'
    : 'Aceste detalii sunt necesare medicului pentru evaluarea rapoartelor.';
  const nameText = hasProfile ? name : '... ?';
  const ageText = hasProfile ? `${age} ani` : '... ?';

  return (
    <>
      <PageHeader title="Date folosite în rapoarte" shortLine={true} />
      <SmallText text={introText} className={`c${S_PRIMARY}`} />

      {!hasProfile && (
        <AlertText
          text="Tensiunea arterială trebuie să fie corelată cu vârsta."
          color={`c${S_ALERT}`}
        />
      )}

      <section className={styles['profile--section']}>
        <div className={styles['profile--text-ico-div']}>
          <UserIco className={styles['profile--ico']} />
          <SmallText text="Nume:" />
          <p className={styles['profile--text']}>{nameText}</p>
        </div>
        <div className={styles['profile--text-ico-div']}>
          <CakeIco className={styles['profile--ico']} />
          <SmallText text="Vârstă:" />
          <p className={styles['profile--text']}>{ageText}</p>
        </div>
      </section>

      <section className={styles['profile--section']}>
        <div className={styles['profile--btn-container']}>
          {hasProfile && <EditIco className={styles['profile--ico']} />}
          <Button
            text={hasProfile ? 'Modifică datele' : 'Completează profilul'}
            onClick={changeProfileHandler}
            styles={hasProfile ? B_TEXT : null}
          />
        </div>
      </section>

      <Line shortLine={true} />
    </>
  );
};

export default ProfileUserInfo;
