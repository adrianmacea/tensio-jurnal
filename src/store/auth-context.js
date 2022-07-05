import React, { useContext } from 'react';

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  userId: '',
  login: (token) => {},
  logout: () => {}
});

export const useAuthContext = () => {
  const authContext = useContext(AuthContext);

  return authContext;
};

export default AuthContext;
