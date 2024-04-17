import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CloseButton from "../../assets/img/close.png";
import Logo from "../../assets/img/logo.png";
import Mp3File from "../../assets/img/mp3.png";
import PdfFile from "../../assets/img/pdf.png";
import AuthContext from "../../config/context/auth-context";
import FileUpload from "../files/FileUpload";
import { customAlert, linkCopiedAlert } from "../../config/alerts/alert";
import ClipboardJS from 'clipboard';

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

  const deleteFile = async (id) => {
    try {
      await axios.delete(
        `http://apiintegradora-env-env.eba-hfx6dimu.us-east-1.elasticbeanstalk.com/files/delete/${id}`,
      );
      customAlert("Correcto", "Archivo eliminado correctamente", "success");
    } catch (error) {
      console.error("Error deleting the file: ", error);
      customAlert("Error", "Error al eliminar el archivo", "error");
    }
  };

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
          "http://apiintegradora-env-env.eba-hfx6dimu.us-east-1.elasticbeanstalk.com/files/getFiles",
        );
        setFiles(response.data);
      } catch (error) {
        console.error("Error fetching files: ", error);
      }
    };
    fetchFiles();
  });

  new ClipboardJS('.copy-button', {
    text: function() {
        return `http://apiintegradora-env-env.eba-hfx6dimu.us-east-1.elasticbeanstalk.com/files/download/${selectedFile._id}`;
    }
});

  return (
    <>
      <div>
        <nav className="flex items-center justify-between p-6 bg-gradient-to-r from-[#164a41] via-[#4d774e] to-[#9dc88d]">
          <div className="flex items-center">
            <img src={Logo} alt="Logo" className="w-26 h-12 mr-2" />
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
          <div className="modal bg-gray-800 fixed inset-0 flex items-center justify-center">
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
              <div className="card bg-white rounded shadow h-80">
                <img
                  className="object-cover h-48 w-full rounded-t"
                  src={
                    file.metadata.value === "application/pdf"
                      ? PdfFile
                      : file.metadata.value === "audio/mpeg"
                        ? Mp3File
                        : `http://apiintegradora-env-env.eba-hfx6dimu.us-east-1.elasticbeanstalk.com/files/download/${file._id}`
                  }
                  alt={file.filename}
                />
                <div className="p-4">
                  <h3 className="overflow-hidden text-ellipsis whitespace-nowrap">
                    {file.filename}
                  </h3>
                </div>
                <div className="p-4 flex justify-between">
                  <button
                    className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
                    onClick={() => handleOpenFileModal(file)}
                  >
                    Abrir
                  </button>
                  <button
                    className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-700"
                    onClick={() => deleteFile(file._id)}
                  >
                    Borrar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {showModalDownload && selectedFile && (
          <div className="modal bg-gray-800 fixed inset-0 flex items-center justify-center">
            <div className="modal-content bg-white p-4 rounded-lg relative w-1/2 h-1/2 mx-auto flex flex-col items-center justify-center">
              <span
                className="close absolute top-4 right-4 cursor-pointer"
                onClick={handleCloseModalDownload}
              >
                <div className="w-5 h-5">
                  <img src={CloseButton} alt="Close" />
                </div>
              </span>
              <div className="flex flex-col items-center justify-center">
                <div style={{ width: "200px", height: "200px" }}>
                  <img
                    style={{ maxWidth: "100%", maxHeight: "100%" }}
                    src={
                      selectedFile.metadata.value === "application/pdf"
                        ? PdfFile
                        : selectedFile.metadata.value === "audio/mpeg"
                          ? Mp3File
                          : `http://apiintegradora-env-env.eba-hfx6dimu.us-east-1.elasticbeanstalk.com/files/download/${selectedFile._id}`
                    }
                    alt={selectedFile.filename}
                  />
                </div>
                <div className="mt-4">
                  <button
                    onClick={() => {
                      linkCopiedAlert();
                    }}
                    className="copy-button px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
                  >
                    Copiar Link de Descarga
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}{" "}
      </div>
    </>
  );
};

export default MainPage;
