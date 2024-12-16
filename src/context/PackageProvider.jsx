import React, { createContext, useState, useEffect } from "react";
import { fetchDocumentsRealtime } from "../services/firebaseService";

export const ContextPackages = createContext();

export const PackagesProvider = ({ children }) => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    // Lắng nghe dữ liệu real-time từ collection "Packages"
    const unsubscribe = fetchDocumentsRealtime("Packages", (packagesList) => {
      setPackages(packagesList);
    });

    // Hủy lắng nghe khi component bị unmount
    return () => unsubscribe();
  }, []);

  return (
    <ContextPackages.Provider value={packages}>
      {children}
    </ContextPackages.Provider>
  );
};
