import React from "react";
import MainPage from "../modules/main/MainPage";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Login from "../modules/auth/Login";

const AppRouter = () => {
  const token = localStorage.getItem("token");
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {token ? (
          <>
            <Route path="/" element={<MainPage />} />
          </>
        ) : (
          <Route path="/" element={<Login />} />
        )}
        <Route path="/*" element={<>404 not found</>} />
      </>
    )
  );
  return <RouterProvider router={router} />;
};

export default AppRouter;
