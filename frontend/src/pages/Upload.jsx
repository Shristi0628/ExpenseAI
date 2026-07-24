import { useState } from "react";

function Upload() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">

      <div className="w-full max-w-2xl rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl p-10">

        {/* Heading */}
        <h1 className="text-5xl font-bold text-center">
          Upload Statement
        </h1>

        <p className="text-center text-slate-400 mt-4 text-lg">
          Upload your Bank Statement (PDF or Excel)
        </p>

        {/* Upload Box */}
        <div className="mt-10 border-2 border-dashed border-slate-700 rounded-2xl h-72 flex flex-col items-center justify-center">

          <div className="text-6xl mb-4">
            📄
          </div>

          <p className="text-xl">
            Drag & Drop your file here
          </p>

          <p className="text-slate-500 mt-2">
            or
          </p>

          {/* Choose File Button */}
          <label className="mt-6 cursor-pointer rounded-xl bg-blue-600 hover:bg-blue-700 transition px-8 py-3 text-lg font-semibold">

            Choose File

            <input
              type="file"
              accept=".pdf,.xlsx,.xls"
              className="hidden"
              onChange={handleFileChange}
            />

          </label>

          {/* Selected File */}
          {selectedFile && (
            <div className="mt-6 text-center">

              <p className="text-green-400 font-semibold">
                ✅ File Selected
              </p>

              <p className="text-slate-300 mt-2 break-all">
                {selectedFile.name}
              </p>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}

export default Upload;