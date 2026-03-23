import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [myFlight, setMyFlight] = useState(null);
  const [currentScreen, setCurrentScreen] = useState("welcome");

  return (
    <AppContext.Provider
      value={{
        myFlight,
        setMyFlight,
        currentScreen,
        setCurrentScreen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
