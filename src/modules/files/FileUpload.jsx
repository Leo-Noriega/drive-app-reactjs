import React, { useState } from "react";
import axios from "axios"; // Make sure to install axios with `npm install axios`

function FileUpload() {
  const [file, setFile] = useState();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]); // Get the first file
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submit action

    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("archivo", file); // 'archivo' should match the key expected on the server

    try {
      const response = await axios.post(
        "http://localhost:3000/files/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert(`File uploaded successfully: ${response.data}`);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="file"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500
        file:mr-4 file:py-2 file:px-4
        file:rounded-full file:border-0
        file:text-sm file:font-semibold
        file:bg-violet-50 file:text-violet-700
        hover:file:bg-violet-100"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Upload
        </button>
      </form>
    </div>
  );
}

export default FileUpload;
