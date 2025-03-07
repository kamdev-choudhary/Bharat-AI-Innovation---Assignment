import React from "react";
import { useGlobalContext } from "../../context/GlobalContext";

const LoginPage = () => {
  const { setIsLoggedIn } = useGlobalContext();
  return (
    <div>
      <div className="bg-primary"></div>
      <button className="btn" onClick={() => setIsLoggedIn(true)}>
        Login
      </button>
    </div>
  );
};

export default LoginPage;
