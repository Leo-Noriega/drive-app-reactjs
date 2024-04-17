import React, { useState } from "react";
import axios from "axios";
import { confirmAlert } from "../../config/alerts/alert";

function FileUpload({ handleCloseModal }) {
  const [file, setFile] = useState();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("archivo", file);
    try {
      const response = await axios.post(
        "http://apiintegradora-env-env.eba-hfx6dimu.us-east-1.elasticbeanstalk.com/files/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      if (response.status === 200) {
        confirmAlert("Correcto", "Archivo subido correctamente", "success");
      }
      // alert(`File uploaded successfully: ${response.data}`);
      handleCloseModal();
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="file"
          onChange={handleFileChange}
          className="block w-full text-sm file:text-white
        file:mr-4 file:py-2 file:px-4
        file:rounded file:border-0
        file:text-sm file:font-semibold
        file:bg-gray-400
        hover:file:bg-slate-800"
        />
        <button
          type="submit"
          className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-700"
        >
          Upload
        </button>
      </form>
    </div>
  );
}

export default FileUpload;
