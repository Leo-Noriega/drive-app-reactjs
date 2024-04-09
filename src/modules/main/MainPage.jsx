import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../config/context/auth-context";
import Logo from "../../assets/img/logo.png";
import CloseButton from "../../assets/img/close.png";
import PdfFile from "../../assets/img/pdf.png";
import Mp3File from "../../assets/img/mp3.png";
import FileUpload from "../files/FileUpload";
import axios from "axios";

const MainPage = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [showModalDownload, setShowModalDownload] = useState(false);
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleOpenFileModal = (file) => {
    setSelectedFile(file);
    setShowModalDownload(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "SIGNOUT" });
    navigate("/", { replace: true });
  };

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleCloseModalDownload = () => setShowModalDownload(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        handleCloseModal();
        handleCloseModalDownload();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/files/getFiles"
        );
        setFiles(response.data);
      } catch (error) {
        console.error("Error fetching files: ", error);
      }
    };
    fetchFiles();
  });

  return (
    <>
      <div>
        <nav className="flex items-center justify-between p-6 bg-gray-600">
          <div className="flex items-center">
            <img src={Logo} alt="Logo" className="w-26 h-12 mr-2" />
            <h1 className="text-white text-2xl font-semibold">Vaultez</h1>
          </div>

          <button
            onClick={handleLogout}
            className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-700"
          >
            Cerrar sesión
          </button>
        </nav>
        <div className="m-10 flex justify-end">
          <button
            onClick={handleOpenModal}
            className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-700"
          >
            Subir archivo
          </button>
        </div>
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
              <FileUpload handleCloseModal={handleCloseModal} />
            </div>
          </div>
        )}
        <div className="flex flex-wrap justify-start">
          {files.map((file) => (
            <div key={file._id} className="w-1/5 p-4">
              <div className="card bg-white rounded shadow">
                <img
                  className="object-cover h-48 w-full rounded-t"
                  src={
                    file.metadata.value === "application/pdf"
                      ? PdfFile
                      : file.metadata.value === "audio/mpeg"
                      ? Mp3File
                      : `http://localhost:3000/files/download/${file._id}`
                  }
                  alt={file.filename}
                />
                <div className="p-4">
                  <button onClick={() => handleOpenFileModal(file)}>
                    Open
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {showModalDownload && selectedFile && (
          <div className="modal bg-gray-800 opacity-95 fixed inset-0 flex items-center justify-center">
            <div className="modal-content bg-white p-4 rounded-lg relative w-1/2 h-1/2 mx-auto flex items-center justify-center">
              <span
                className="close absolute top-4 right-4 cursor-pointer"
                onClick={handleCloseModalDownload}
              >
                <div className="w-5 h-5">
                  <img src={CloseButton} alt="Close" />
                </div>
              </span>
              <img
                style={{ maxWidth: "80%", maxHeight: "80%" }} // Ajusta estos valores según tus necesidades
                src={`http://localhost:3000/files/download/${selectedFile._id}`}
                alt={selectedFile.filename}
              />
              <button
                onClick={() => {
                  navigator.clipboard.writeText(
                    `http://localhost:3000/files/download/${selectedFile._id}`
                  );
                }}
                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700" // Añade estilos a tu botón aquí
              >
                Copy Download Link
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MainPage;
