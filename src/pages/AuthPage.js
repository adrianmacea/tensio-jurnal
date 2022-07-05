import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Card from '../components/UI/Card';
import PageHeader from '../components/UI/PageHeader';
import AuthForm from '../components/forms/AuthForm';
import Line from '../components/UI/Line';
import SmallText from '../components/UI/SmallText';
import SmallTextLink from '../components/UI/SmallTextLink';
import useFirebaseUrl from '../hooks/use-firebase-url';
import {
  R_LANDING,
  R_SIGNIN,
  R_SIGNUP,
  R_TERMS,
  R_RESET_PASS,
  R_PRIVACY
} from '../helpers/global-constants';

const AuthPage = () => {
  const { signInUrl, signUpUrl } = useFirebaseUrl();
  const [signInMode, setSignInMode] = useState({
    isSignIn: true,
    url: '',
    pageTitle: '',
    buttonText: ''
  });
  const navigate = useNavigate();
  const { authmode } = useParams();

  const signInModeHandler = () => {
    navigate(`${R_LANDING}${R_SIGNIN}`);
  };
  const signUpModeHandler = () => {
    navigate(`${R_LANDING}${R_SIGNUP}`);
  };
  const resetPassHandler = () => {
    navigate(`${R_LANDING}${R_RESET_PASS}`);
  };
  const termsHandler = () => {
    navigate(`${R_LANDING}${R_TERMS}`);
  };
  const privacyHandler = () => {
    navigate(`${R_LANDING}${R_PRIVACY}`);
  };

  useEffect(() => {
    if (authmode === R_SIGNIN.substring(1))
      setSignInMode({
        isSignIn: true,
        url: signInUrl,
        pageTitle: 'Autentificare utilizator',
        buttonText: 'Autentificare'
      });
    else if (authmode === R_SIGNUP.substring(1))
      setSignInMode({
        isSignIn: false,
        url: signUpUrl,
        pageTitle: 'Înregistrare utilizator nou',
        buttonText: 'Înregistrare'
      });
    else navigate(R_LANDING, { replace: true });
  }, [authmode, signInUrl, signUpUrl, navigate]);

  return (
    <Card>
      <PageHeader title={signInMode.pageTitle} shortLine={true} />
      <AuthForm signInMode={signInMode} />
      {signInMode.isSignIn && (
        <SmallTextLink text="Ai uitat parola?" onClick={resetPassHandler} />
      )}
      {!signInMode.isSignIn && (
        <>
          <p>
            <SmallText text="Înregistrându-te îți exprimi și acordul cu" />{' '}
          </p>
          <p>
            <SmallTextLink
              text="Termenii de utilizare"
              onClick={termsHandler}
            />{' '}
            <SmallText text="și" />{' '}
            <SmallTextLink
              text="Politica de confidențialitate a datelor"
              onClick={privacyHandler}
            />
            <SmallText text="." />
          </p>
        </>
      )}
      <Line shortLine={true} />
      {signInMode.isSignIn && (
        <SmallTextLink
          text="Încă nu ai un cont? Înregistrează-te."
          onClick={signUpModeHandler}
        />
      )}
      {!signInMode.isSignIn && (
        <SmallTextLink
          text="Ai deja un cont? Autentifică-te."
          onClick={signInModeHandler}
        />
      )}
    </Card>
  );
};

export default AuthPage;
