import React, { createContext, useState, useEffect } from "react";
import { fetchDocumentsRealtime } from "../services/firebaseService"; // Assuming this function is available

export const ContextActors = createContext();

export const ActorsProvider = ({ children }) => {
  const [actors, setActors] = useState([]);

  useEffect(() => {
    // Using fetchDocumentsRealtime to listen to real-time data changes
    const unsubscribe = fetchDocumentsRealtime("Actors", (actorsList) => {
      setActors(actorsList);
    });

    // Clean up listener when the component is unmounted
    return () => unsubscribe();
  }, []);

  return (
    <ContextActors.Provider value={actors}>
      {children}
    </ContextActors.Provider>
  );
};
