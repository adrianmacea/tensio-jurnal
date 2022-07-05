import { NavLink } from 'react-router-dom';
import { MdOutlineAccountCircle as UserIco } from 'react-icons/md';
import { MdAdd as CitireIco } from 'react-icons/md';
import { MdOutlineShowChart as StatisticiIco } from 'react-icons/md';
import { MdList as IstoricIco } from 'react-icons/md';
import { MdDateRange as CalendarIco } from 'react-icons/md';
import { MdOutlineSummarize as RaportIco } from 'react-icons/md';
import { MdOutlineMedicalServices as MedicatieIco } from 'react-icons/md';
import { MdFavoriteBorder as HipertensiuneIco } from 'react-icons/md';
import { MdImportExport as ImpExpIco } from 'react-icons/md';
import { MdOutlineHelpOutline as HelpIco } from 'react-icons/md';
import { MdOutlineEmail as ContactIco } from 'react-icons/md';
import { MdOutlineGavel as TermeniIco } from 'react-icons/md';
import { MdOutlinePolicy as ConfidentialitateIco } from 'react-icons/md';
import { MdOutlineLogout as LogoutIco } from 'react-icons/md';

import styles from './LeftNavigation.module.css';
import Logo from '../../assets/Logo';
import useQueryUserData from '../../hooks/http-req/use-query-user-data';
import { useAuthContext } from '../../store/auth-context';
import { usePanelsContext } from '../../store/panels-context';
import {
  R_TERMS,
  R_PRIVACY,
  R_CALENDAR,
  R_READING,
  R_HELP,
  R_ABOUT_HT,
  R_HOME,
  R_IMP_EXP,
  R_HISTORY,
  R_MEDICATION,
  R_REPORT,
  R_STATISTICS,
  R_PROFILE,
  R_CONTACT
} from '../../helpers/global-constants';

const LeftNavigation = () => {
  const { logout } = useAuthContext();
  const { isNavOpen, windowWidth } = usePanelsContext();
  const { nickname, email } = useQueryUserData();

  const emailSplit = email?.split('@')[0];
  const nickFallback = emailSplit?.substring(0, 13);
  const userNickname = nickname ? nickname : nickFallback;

  let logoSize = 28;
  switch (true) {
    case windowWidth > 1199:
      logoSize = 38;
      break;
    case windowWidth > 959:
      logoSize = 36;
      break;
    case windowWidth > 687:
      logoSize = 32;
      break;
    // no default
  }

  return (
    <div className={styles['left-nav']}>
      <div>
        <NavLink to={R_HOME} className={styles['left-nav--logo-box']}>
          <Logo
            className={styles['left-nav--logo-icon']}
            logoSize={logoSize}
          />
          {isNavOpen && (
            <h1 className={styles['left-nav--logo-text']}>
              Tensio<span>Jurnal</span>
            </h1>
          )}
        </NavLink>
        <ul className={styles['left-nav--primary']}>
          <li id={styles['left-nav--user-name']}>
            <NavLink
              className={({ isActive }) => (isActive ? styles.active : '')}
              to={R_PROFILE}
            >
              <UserIco className={styles['left-nav--ico']} />
              {isNavOpen && <p>{userNickname}</p>}
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? styles.active : '')}
              to={R_READING}
            >
              <CitireIco className={styles['left-nav--ico']} />
              {isNavOpen && <p>Citire nouă</p>}
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? styles.active : '')}
              to={R_HISTORY}
            >
              <IstoricIco className={styles['left-nav--ico']} />
              {isNavOpen && <p>Istoric</p>}
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? styles.active : '')}
              to={R_CALENDAR}
            >
              <CalendarIco className={styles['left-nav--ico']} />
              {isNavOpen && <p>Calendar</p>}
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? styles.active : '')}
              to={R_STATISTICS}
            >
              <StatisticiIco className={styles['left-nav--ico']} />
              {isNavOpen && <p>Statistici</p>}
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? styles.active : '')}
              to={R_REPORT}
            >
              <RaportIco className={styles['left-nav--ico']} />
              {isNavOpen && <p>Raport</p>}
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? styles.active : '')}
              to={R_MEDICATION}
            >
              <MedicatieIco className={styles['left-nav--ico']} />
              {isNavOpen && <p>Medicație</p>}
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? styles.active : '')}
              to={R_ABOUT_HT}
            >
              <HipertensiuneIco className={styles['left-nav--ico']} />
              {isNavOpen && <p>Hipertensiune</p>}
            </NavLink>
          </li>
        </ul>
      </div>
      <div className={styles['left-nav--secondary-container']}>
        <ul className={styles['left-nav--secondary']}>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? styles.active : '')}
              to={R_IMP_EXP}
            >
              <ImpExpIco className={styles['left-nav--ico']} />
              {isNavOpen && <p>Import / export</p>}
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? styles.active : '')}
              to={R_HELP}
            >
              <HelpIco className={styles['left-nav--ico']} />
              {isNavOpen && <p>TensioJurnal</p>}
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? styles.active : '')}
              to={R_CONTACT}
            >
              <ContactIco className={styles['left-nav--ico']} />
              {isNavOpen && <p>Contact</p>}
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? styles.active : '')}
              to={R_TERMS}
            >
              <TermeniIco className={styles['left-nav--ico']} />
              {isNavOpen && <p>Termeni utilizare</p>}
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? styles.active : '')}
              to={R_PRIVACY}
            >
              <ConfidentialitateIco className={styles['left-nav--ico']} />
              {isNavOpen && <p>Confidențialitate</p>}
            </NavLink>
          </li>
          <li onClick={logout}>
            <NavLink to="/">
              <LogoutIco className={styles['left-nav--ico']} />
              {isNavOpen && <p>Deconectare</p>}
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LeftNavigation;
