import React, { createContext, useState, useEffect } from "react";
import { fetchDocumentsRealtime } from "../services/firebaseService";

export const ContextEpisodes = createContext();

export const EpisodeProvider = ({ children }) => {
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    // Lắng nghe dữ liệu real-time từ collection "Episodes"
    const unsubscribe = fetchDocumentsRealtime("Episodes", (episodesList) => {
      setEpisodes(episodesList);
    });

    // Hủy lắng nghe khi component bị unmount
    return () => unsubscribe();
  }, []);

  return (
    <ContextEpisodes.Provider value={episodes}>
      {children}
    </ContextEpisodes.Provider>
  );
};
