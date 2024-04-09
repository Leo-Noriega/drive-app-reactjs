import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../config/context/auth-context";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Here you can perform your login logic
    console.log("Username:", username);
    console.log("Password:", password);
    try {
      const response = await axios.post("http://localhost:3000/auth/signin", {
        username: username,
        password: password,
      });
      if (response.status === 200) {
        // Get the token of the response
        const token = response.data.token;
        // Store the token in local storage
        localStorage.setItem("token", token);
        console.log(`Login succesfull ${token}`);
        // Update AuthContext
        dispatch({ type: "SIGNIN", payload: token });
        navigate("/", { replace: true });
      } else if (response.status === 404) {
        console.log("Invalid username or password");
      } else if (response.status === 400) {
        console.log("Service unavailable");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-600">
      <form onSubmit={handleSubmit} className="space-y-6">
        <label className="text-white">Username</label>
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={handleUsernameChange}
          className="block w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-700 text-white focus:outline-none focus:ring focus:border-blue-500"
        />
        <label className="text-white">Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={handlePasswordChange}
          className="block w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-700 text-white focus:outline-none focus:ring focus:border-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
          style={{ width: "100%" }} // Set button width to match input width
        >
          Iniciar sesión
        </button>
      </form>
    </div>
  );
};

export default Login;
