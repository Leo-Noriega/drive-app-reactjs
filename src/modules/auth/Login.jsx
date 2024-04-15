import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../config/context/auth-context";
import Logo from "../../assets/img/logo.png";
import { customAlert } from "../../config/alerts/alert";

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
        // Update AuthContext
        dispatch({ type: "SIGNIN", payload: token });
        customAlert("Correcto", "Inicio de sesión exitoso", "success");
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
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-[#164a41] via-[#4d774e] to-[#9dc88d]">
      <div className="flex items-center justify-center h-1/2 w-4/12 bg-[#ffffff] outline outline-4 outline-[#f1b24a] rounded-md">
        <form onSubmit={handleSubmit} className="space-y-4 w-5/12">
          <img className="w-full h-full" src={Logo} />
          <input
            type="text"
            placeholder="Usuario"
            onChange={handleUsernameChange}
            className="block h-8 w-full outline outline-1 outline-black rounded text-center"
          />
          <input
            type="password"
            placeholder="Contraseña"
            onChange={handlePasswordChange}
            className="block h-8 w-full outline outline-1 outline-black rounded text-center"
          />
          <button
            type="submit"
            className="px-4 py-2 text-white bg-[#f1b24a] rounded hover:bg-[#164a41] w-full font-bold"
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
