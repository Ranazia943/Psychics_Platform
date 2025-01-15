import { createContext, useContext, useState } from "react";

export const PsyAuthContext = createContext();

export const PsyuseAuthContext = () => {
  return useContext(PsyAuthContext);
};

export const PsyAuthContextProvider = ({ children }) => {
  const [authPsychics, setAuthPsychics] = useState(
    JSON.parse(localStorage.getItem("chat-psychics")) || null
  );

  return (
    <PsyAuthContext.Provider value={{ authPsychics, setAuthPsychics }}>
      {children}
    </PsyAuthContext.Provider>
  );
};
