import { useAuthContext } from '../store/auth-context';

const useFirebaseUrl = (id = '') => {
  const { userId, token } = useAuthContext();

  const FIREBASE_API_KEY = process.env.REACT_APP_FIREBASE_API_KEY;
  const FIREBASE_DB_DOMAIN = process.env.REACT_APP_FIREBASE_DB_DOMAIN;

  const signInUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`;
  const signUpUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_KEY}`;
  
  const userDataUrl = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${FIREBASE_API_KEY}`;
  const changeUserDataUrl = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${FIREBASE_API_KEY}`;

  const sendEmailVerifUrl = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${FIREBASE_API_KEY}`;

  const readingsUrl = `${FIREBASE_DB_DOMAIN}/${userId}/readings${id}.json?auth=${token}`;
  const userInfoUrl = `${FIREBASE_DB_DOMAIN}/${userId}/profile.json?auth=${token}`;
  const emailSentUrl = `${FIREBASE_DB_DOMAIN}/${userId}/emailsent.json?auth=${token}`;
  const medicationUrl = `${FIREBASE_DB_DOMAIN}/${userId}/medication${id}.json?auth=${token}`;

  return {
    signInUrl,
    signUpUrl,
    userDataUrl,
    changeUserDataUrl,
    sendEmailVerifUrl,
    readingsUrl,
    userInfoUrl,
    medicationUrl,
    emailSentUrl
  };
};

export default useFirebaseUrl;
