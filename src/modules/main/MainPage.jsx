import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../config/context/auth-context";
import Logo from "../../assets/img/logo.png";
import CloseButton from "../../assets/img/close.png";
import FileUpload from "../files/FileUpload";

const MainPage = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "SIGNOUT" });
    navigate("/", { replace: true });
  };

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        handleCloseModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <div>
        <nav className="flex items-center justify-between p-6 bg-slate-500">
          <div className="flex items-center">
            <img src={Logo} alt="Logo" className="w-26 h-12 mr-2" />
            <h1 className="text-white text-2xl font-semibold">Utez Vault</h1>
          </div>

          <button
            onClick={handleLogout}
            className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-700"
          >
            Cerrar sesión
          </button>
        </nav>
        <button
          onClick={handleOpenModal}
          className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-700"
        >
          Agregar
        </button>
        {showModal && (
          <div className="modal bg-gray-800 opacity-95 fixed inset-0 flex items-center justify-center">
            <div className="modal-content bg-white p-4 rounded-lg relative w-1/2 h-1/2 mx-auto flex items-center justify-center">
              <span
                className="close absolute top-4 right-4 cursor-pointer"
                onClick={handleCloseModal}
              >
                <div className="w-5 h-5">
                  <img src={CloseButton} alt="Close" />
                </div>
              </span>
              <FileUpload />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MainPage;
