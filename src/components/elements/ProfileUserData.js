import { useNavigate } from 'react-router-dom';
import { MdOutlineAccountCircle as NickIco } from 'react-icons/md';
import { MdMailOutline as EmailIco } from 'react-icons/md';
import { MdOutlineModeEdit as EditIco } from 'react-icons/md';

import styles from './Profile.module.css';
import PageHeader from '../UI/PageHeader';
import SmallText from '../UI/SmallText';
import Button from '../UI/Button';
import Line from '../UI/Line';
import useQueryUserData from '../../hooks/http-req/use-query-user-data';
import {
  R_PROFILE,
  R_UPDATE_NICK,
  R_UPDATE_MAIL,
  R_UPDATE_PASS,
  B_TEXT,
  S_PRIMARY
} from '../../helpers/global-constants';

const ProfileEmail = () => {
  const navigate = useNavigate();
  const { nickname, email } = useQueryUserData();

  const emailSplit = email?.split('@')[0];
  const nickFallback = emailSplit?.substring(0, 13);
  const userNickname = nickname ? nickname : nickFallback;

  const changeNicknameHandler = () => {
    navigate(`${R_PROFILE}${R_UPDATE_NICK}`);
  };
  const changeEmailHandler = () => {
    navigate(`${R_PROFILE}${R_UPDATE_MAIL}`);
  };
  const changePasswordHandler = () => {
    navigate(`${R_PROFILE}${R_UPDATE_PASS}`);
  };

  const text = 'Aceste date sunt private. Nu sunt vizibile în rapoarte.';

  return (
    <>
      <PageHeader title="Date folosite de aplicație" shortLine={true} />
      <SmallText text={text} className={`c${S_PRIMARY}`}/>

      <section className={styles['profile--section']}>
        <div className={styles['profile--text-ico-div']}>
          <NickIco className={styles['profile--ico']} />
          <SmallText text="Nickname:" />
          <p className={styles['profile--text']}>{userNickname}</p>
        </div>
        <div className={styles['profile--text-ico-div']}>
          <EmailIco className={styles['profile--ico']} />
          <SmallText text="Email:" />
          <p className={styles['profile--text']}>{email}</p>
        </div>
      </section>

      <div className={styles['profile--btn-cluster']}>
        <div className={styles['profile--btn-container']}>
          <EditIco className={styles['profile--ico']} />
          <Button
            text="Modifică 'nickname'"
            onClick={changeNicknameHandler}
            styles={B_TEXT}
          />
        </div>
        <div className={styles['profile--btn-container']}>
          <EditIco className={styles['profile--ico']} />
          <Button
            text="Modifică e-mail"
            onClick={changeEmailHandler}
            styles={B_TEXT}
          />
        </div>
        <div className={styles['profile--btn-container']}>
          <EditIco className={styles['profile--ico']} />
          <Button
            text="Modifică parola"
            onClick={changePasswordHandler}
            styles={B_TEXT}
          />
        </div>
      </div>

      <Line shortLine={true} />
    </>
  );
};

export default ProfileEmail;
