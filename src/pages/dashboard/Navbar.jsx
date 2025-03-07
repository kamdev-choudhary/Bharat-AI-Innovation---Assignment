import React from "react";
import { useGlobalContext } from "../../context/GlobalContext";

const Navbar = () => {
  const { setIsLoggedIn } = useGlobalContext();
  return (
    <header className="bg-blue-100 h-15 flex justify-between p-2">
      <p className="text-xl font-bold">BHARAT AI INNOVATION</p>
      <button
        className="bg-red-400  rounded-full px-3.5 min-w-25 cursor-pointer text-white"
        onClick={() => setIsLoggedIn(false)}
      >
        Logout
      </button>
    </header>
  );
};

export default Navbar;
