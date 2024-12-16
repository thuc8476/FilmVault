import React, { createContext, useContext } from 'react';

const AccountContext = createContext();

export const ProfileProvider = ({ children, value }) => {
    return <AccountContext.Provider value={value}>{children}</AccountContext.Provider>;
};

export const useAccount = () => useContext(AccountContext);