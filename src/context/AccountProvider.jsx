import React, { createContext, useState, useEffect } from "react";
import { fetchDocumentsRealtime } from "../services/firebaseService"; // Assuming this function is available
export const ContextAccounts = createContext();
export const AccountsProvider = ({ children }) => {
  const [accounts, setAccounts] = useState([]);
  useEffect(() => {
    // Using fetchDocumentsRealtime to listen to real-time data changes
    const unsubscribe = fetchDocumentsRealtime("Accounts", (accountsList) => {
      setAccounts(accountsList);
    });

    // Clean up listener when the component is unmounted
    return () => unsubscribe();
  }, []);

  return (
    <ContextAccounts.Provider value={accounts}>
      {children}
    </ContextAccounts.Provider>
  );
};
