import { createContext, useState } from "react";

export const ControllerContext = createContext();

// create a provider for the controller context
export const ControllerProvider = ({ children }) => {
  const [locked, setLocked] = useState(false);

  return (
    <ControllerContext.Provider value={{ locked, setLocked }}>
      {children}
    </ControllerContext.Provider>
  );
};
