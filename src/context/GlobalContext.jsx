import React, { createContext, useContext, useEffect, useState } from "react";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginWebsite = () => {
    localStorage.setItem("token", "123");
    setIsLoggedIn(true);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && token === "123") {
      setIsLoggedIn(true);
    }
  }, []);

  const logoutWebsite = () => {
    setIsLoggedIn(false);
    localStorage.clear();
  };

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
    localStorage.setItem(
      "theme",
      document.documentElement.classList.contains("dark") ? "dark" : "light"
    );
    console.log("mode");
  };

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        loginWebsite,
        logoutWebsite,
        toggleDarkMode,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
