import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext({
  user: null,
  setUser: () => {},
  isLoading: true,
  error: null
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/user/getuser')
      .then(({ data }) => {
        if (data.newuser && data.newuser.isActive===true && data.newuser.role==="user") {
          setUser(data.newuser);
        } else {
          setError('User not found');
        }
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
        setError('Error fetching user data');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, isLoading, error }}>
      {children}
    </UserContext.Provider>
  );
};
