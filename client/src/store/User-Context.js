import React, { useState, useEffect } from 'react';

const UserContext = React.createContext({
  id: null,
  userEmail: null,
  userName: null,
});

export const UserContextProvider = (props) => {
  const [id, setId] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await fetch();
    };
  });

  const idUpdateHandler = (id) => {
    setId(id);
  };

  return (
    <UserContext.Provider
      value={{
        id,
        updateId: idUpdateHandler,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
