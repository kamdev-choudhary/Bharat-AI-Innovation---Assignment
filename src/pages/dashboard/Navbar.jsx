import React from "react";
import { useGlobalContext } from "../../context/GlobalContext";

const Navbar = () => {
  const { logoutWebsite, toggleDarkMode } = useGlobalContext();
  return (
    <header className="bg-blue-100 dark:bg-gray-900 h-15 flex justify-between p-2 items-center">
      <p className="text-xl font-bold dark:text-white">BHARAT AI INNOVATION</p>
      <div className="flex gap-2 items-center">
        <div className="flex gap-2 items-center p-2">
          <input onChange={toggleDarkMode} id="checkbox" type="checkbox" />
          <label htmlFor="checkbox" className="dark:text-white">
            Light Mode
          </label>
        </div>
        <button
          className="bg-red-400 p-2 rounded-full px-3.5 min-w-25 cursor-pointer text-white"
          onClick={logoutWebsite}
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
