import React, { useState } from "react";
import { useGlobalContext } from "../../context/GlobalContext";

const LoginPage = () => {
  const { loginWebsite } = useGlobalContext();
  const [userId, setuserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    try {
      setLoading(true);

      if (userId === "admin" && password === "admin") {
        loginWebsite();
      } else {
        setError("ID or Password Incorrect.");
      }
      e.preventDefault();
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  };

  return (
    <div className="flex justify-center w-[100vw]  h-[100vh] items-center">
      <form
        onSubmit={handleLogin}
        className="bg-[#f1f3fb] h-auto p-4 rounded-2xl max-w-120 w-full gap-4 flex flex-col py-10"
      >
        <div className="flex justify-center">
          <p className="text-2xl">Login Page</p>
        </div>
        <hr className="border-gray-400" />
        <input
          className="border p-2 w-full rounded-l"
          placeholder="User ID"
          value={userId}
          onChange={(e) => {
            setuserId(e.target.value);
            if (error) {
              setError("");
            }
          }}
        />
        <input
          className="border p-2 w-full rounded-l"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (error) {
              setError("");
            }
          }}
          type={showPassword ? "text" : "password"}
        />
        <div className="flex gap-3">
          <input
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
            type="checkbox"
            id="showpassword-checkbox"
          />
          <label htmlFor="showpassword-checkbox">Show Password</label>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button
          className={`${
            loading ? "bg-gray-300" : "bg-amber-600"
          } p-2 rounded-4xl hover:${
            loading ? "bg-gray-400" : "bg-amber-700"
          } text-white cursor-pointer`}
          onClick={handleLogin}
          type="submit"
          disabled={loading}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
