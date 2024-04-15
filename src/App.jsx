import { useState, useReducer, useEffect } from "react";
import Login from "./modules/auth/Login";
import AuthContext from "./config/context/auth-context";
import { authManager } from "./config/context/auth-manager";
import AppRouter from "./router/AppRouter";

const init = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user && user.signed ? user : null;
};

function App() {
  const [user, dispatch] = useReducer(authManager, {}, init);

  useEffect(() => {
    if (!user) return;
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, dispatch }}>
      <AppRouter />
    </AuthContext.Provider>
  );
}

export default App;
