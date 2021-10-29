import React from 'react';
import useCheckUser from '../hooks/useCheckUser';

const UserContext = React.createContext({
  user: null,
  isLoggedIn: false,
  isLoading: true,
  login: () => {},
  logout: () => {},
});

export const UserContextProvider = (props) => {
  const { user, setUser, isLoading } = useCheckUser();

  const isLoggedIn = !!user;

  const loginHandler = (user) => {
    setUser(user);
  };

  const logoutHandler = () => {
    setUser(null);
  };

  const userContextValue = {
    user,
    isLoggedIn,
    isLoading,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <UserContext.Provider value={userContextValue}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
