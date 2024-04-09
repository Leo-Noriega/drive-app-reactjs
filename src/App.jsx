import { useState, useReducer, useEffect } from "react";
import Login from "./modules/auth/Login";
import AuthContext from "./config/context/auth-context";
import { authManager } from "./config/context/auth-manager";
import AppRouter from "./router/AppRouter";

const init = () => {
  return JSON.parse(localStorage.getItem("token")) || null;
};

function App() {
  const [user, dispatch] = useReducer(authManager, {}, init);

  useEffect(() => {
    if (!user) return;
    localStorage.setItem("token", JSON.stringify(user));
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, dispatch }}>
      <AppRouter />
    </AuthContext.Provider>
  );
}

export default App;
