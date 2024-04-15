import MainPage from "../modules/main/MainPage";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Login from "../modules/auth/Login";
import { useContext } from "react";
import AuthContext from "../config/context/auth-context";

const AppRouter = () => {
  const {user} = useContext(AuthContext);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {user && user.signed ? (
          <>
            <Route path="/" element={<MainPage />} />
          </>
        ) : (
          <Route path="/" element={<Login />} />
        )}
        <Route path="/*" element={<>404 not found</>} />
      </>,
    ),
  );
  return <RouterProvider router={router} />;
};

export default AppRouter;
