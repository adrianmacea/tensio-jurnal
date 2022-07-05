import { useState, useEffect, useCallback } from 'react';
import { useQueryClient } from 'react-query';
import { sub, isBefore } from 'date-fns';
import { useNavigate } from 'react-router-dom';

import AuthContext from './auth-context';
import { R_LOGGED_OUT, R_LANDING } from '../helpers/global-constants';

const TOKEN_ID = 'tensiojurnalToken';
const TOKEN_VALIDITY_ID = 'tensiojurnalTokenValidity';
const UID_ID = 'tensiojurnalUID';

const getTokenValidity = (expirationTime) => {
  const now = new Date();
  const expiration = sub(new Date(expirationTime), { minutes: 3 });
  return isBefore(now, expiration);
};

const retrieveStoredToken = () => {
  /* fn used for automatic login if token has not expired */
  const storedToken = localStorage.getItem(TOKEN_ID);
  const storedTokenValidityTime = localStorage.getItem(TOKEN_VALIDITY_ID);
  const isTokenValid = getTokenValidity(storedTokenValidityTime);
  if (!isTokenValid) {
    localStorage.removeItem(TOKEN_ID);
    localStorage.removeItem(TOKEN_VALIDITY_ID);
    return null;
  }
  return storedToken;
};

const initialUserId = localStorage.getItem(UID_ID);

const AuthProvider = (props) => {
  const initialTokenValue = retrieveStoredToken();
  const [token, setToken] = useState(initialTokenValue);
  const [userId, setUserId] = useState(initialUserId);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem(TOKEN_ID);
    localStorage.removeItem(UID_ID);
    localStorage.removeItem(TOKEN_VALIDITY_ID);
    queryClient.clear();
  }, [queryClient]);

  const loginHandler = (token, expirationTime, localId) => {
    setToken(token);
    setUserId(localId);
    localStorage.setItem(TOKEN_ID, token);
    localStorage.setItem(UID_ID, localId);
    localStorage.setItem(TOKEN_VALIDITY_ID, expirationTime);
  };

  const isLoggedIn = !!token;

  useEffect(() => {
    /* fn used for automatic logout if token expires, checkes every 2 minutes */
    const interval = setInterval(() => {
      const storedTokenValidityTime = localStorage.getItem(TOKEN_VALIDITY_ID);
      const isTokenValid = getTokenValidity(storedTokenValidityTime);
      if (!isTokenValid & isLoggedIn) {
        navigate(`${R_LANDING}${R_LOGGED_OUT}`);
        logoutHandler();
        console.log('Token expired, you were logged out.');
      }
    }, 120000);
    return () => clearInterval(interval);
  }, [isLoggedIn, logoutHandler, navigate]);

  const authContext = {
    token,
    isLoggedIn,
    userId,
    login: loginHandler,
    logout: logoutHandler
  };

  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

/* 
Below is the alternative using timer, but automatic logout doesn't work if computer enters in standby mode because of timer freeze.

import { useCallback, useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';

import AuthContext from './auth-context';

const TOKEN = 'tensiojurnalToken';
const TOKEN_VALIDITY = 'tensiojurnalTokenValidity';
const UID = 'tensiojurnalUID';

let logoutTimer;

const calculateRemainingTime = (expirationTime) => {
  const now = new Date().getTime(); //current time
  const expiration = new Date(expirationTime).getTime(); //in future (half hour maybe)
  const duration = expiration - now;
  return duration;
};

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem(TOKEN);
  const storedTokenValidityTime = localStorage.getItem(TOKEN_VALIDITY);
  const remainingTime = calculateRemainingTime(storedTokenValidityTime);
  if (remainingTime < 180000) {
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(TOKEN_VALIDITY);
    return null;
  }
  const tokenData = {
    token: storedToken,
    duration: remainingTime
  };
  return tokenData;
};

const initialUserId = localStorage.getItem(UID);

const AuthProvider = (props) => {
  const tokenData = retrieveStoredToken();
  let initialTokenValue;
  if (tokenData) initialTokenValue = tokenData.token;
  const [token, setToken] = useState(initialTokenValue);
  const [userId, setUserId] = useState(initialUserId);
  const queryClient = useQueryClient();

  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(UID);
    localStorage.removeItem(TOKEN_VALIDITY);
    if (logoutTimer) clearTimeout(logoutTimer); //clear timer if user is manually loged-out
    queryClient.clear();
  }, [queryClient]);

  const loginHandler = (token, expirationTime, localId) => {
    setToken(token);
    setUserId(localId);
    localStorage.setItem(TOKEN, token);
    localStorage.setItem(UID, localId);
    localStorage.setItem(TOKEN_VALIDITY, expirationTime);
    const tokenValidityTime = calculateRemainingTime(expirationTime);
    logoutTimer = setTimeout(logoutHandler, tokenValidityTime); //automatic logout after token expires
  };

  useEffect(() => {
    if (tokenData) {
      logoutTimer = setTimeout(logoutHandler, tokenData.duration); //recalculates automatic logout after an automatic login
    }
  }, [tokenData, logoutHandler]);

  const authContext = {
    token,
    isLoggedIn: !!token,
    userId,
    login: loginHandler,
    logout: logoutHandler
  };

  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
*/
