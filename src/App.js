import { Routes, Route, Navigate } from 'react-router-dom';

import Layout from './components/layout/Layout';
import LandingPage from './components/layout/LandingPage';
import LandingPageMain from './pages/LadingPageMain';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import ForgatPass from './pages/ForgatPass';
import UserProfile from './pages/UserProfile';
import NewReadingPage from './pages/NewReadingPage';
import Calendar from './pages/Calendar';
import Contact from './pages/Contact';
import Help from './pages/Help';
import AboutHypertension from './pages/AboutHypertension';
import ImportExport from './pages/ImportExport';
import History from './pages/History';
import Medication from './pages/Medication';
import NotFound from './pages/NotFound';
import Report from './pages/Report';
import Statistics from './pages/Statistics';
import TermsOfUse from './pages/TermsOfUse';
import PrivacyPolicy from './pages/PrivacyPolicy';
import LoggedOut from './pages/LoggedOut.js'

import Modal from './components/UI/Modal';
import { useModalContext } from './store/modal-context';
import { useAuthContext } from './store/auth-context';
import {
  R_LANDING,
  R_RESET_PASS,
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
  R_CONTACT,
  R_LOGGED_OUT
} from './helpers/global-constants';

function App() {
  const { modalIsVisible, modalName } = useModalContext();
  const { isLoggedIn } = useAuthContext();

  return (
    <>
      {modalIsVisible && <Modal modalName={modalName} />}
      <Layout>
        {!isLoggedIn && (
          <Routes>
            <Route path="*" element={<Navigate replace to={R_LANDING} />} />
            <Route path={R_LANDING} element={<LandingPage />}>
              <Route path={R_LANDING} element={<LandingPageMain />} />
              <Route path=":authmode" element={<AuthPage />} />
              <Route
                path={`${R_RESET_PASS.substring(1)}`}
                element={<ForgatPass />}
              />
              <Route
                path={`${R_TERMS.substring(1)}`}
                element={<TermsOfUse />}
              />
              <Route
                path={`${R_PRIVACY.substring(1)}`}
                element={<PrivacyPolicy />}
              />
              <Route
                path={`${R_LOGGED_OUT.substring(1)}`}
                element={<LoggedOut />}
              />
            </Route>
          </Routes>
        )}
        {isLoggedIn && (
          <Routes>
            <Route path="/" element={<Navigate replace to={R_HOME} />} />
            <Route path={R_RESET_PASS} element={<ForgatPass />} />
            <Route path={R_CALENDAR} element={<Calendar />} />
            <Route path={R_READING} element={<NewReadingPage />} />
            <Route path={R_PRIVACY} element={<PrivacyPolicy />} />
            <Route path={R_CONTACT} element={<Contact />} />
            <Route path={R_HELP} element={<Help />} />
            <Route path={R_ABOUT_HT} element={<AboutHypertension />} />
            <Route path={R_HOME} element={<HomePage />} />
            <Route path={R_IMP_EXP} element={<ImportExport />} />
            <Route path={R_HISTORY} element={<History />} />
            <Route path={R_MEDICATION} element={<Medication />} />
            <Route path={R_REPORT} element={<Report />} />
            <Route path={R_STATISTICS} element={<Statistics />} />
            <Route path={R_TERMS} element={<TermsOfUse />} />
            <Route path={`${R_PROFILE.substring(1)}`} element={<UserProfile />}>
              <Route path=":params" element={<UserProfile />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        )}
      </Layout>
    </>
  );
}

export default App;
