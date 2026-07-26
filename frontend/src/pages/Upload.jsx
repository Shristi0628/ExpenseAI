import { useState } from "react";
import api from "../services/api";

function Upload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [fileName, setFileName] = useState("");
  const [rows, setRows] = useState(0);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await api.post("/upload", formData);

      console.log(response.data);

      setTransactions(response.data.transactions);
      setFileName(response.data.filename);
      setRows(response.data.rows);

    } catch (error) {
      console.error(error);
      alert("Upload failed!");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6 py-10">

      <div className="w-full max-w-5xl rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl p-10">

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

          {/* Choose File */}
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

              {/* Upload Button */}
              <button
                onClick={handleUpload}
                className="mt-5 bg-green-600 hover:bg-green-700 px-8 py-3 rounded-xl text-lg font-semibold transition"
              >
                Upload
              </button>

            </div>
          )}

        </div>

        {/* Transaction Table */}
        {transactions.length > 0 && (
          <div className="mt-10">

            <h2 className="text-2xl font-bold">
              Uploaded Statement
            </h2>

            <p className="text-slate-400 mt-2">
              <strong>File:</strong> {fileName}
            </p>

            <p className="text-slate-400 mb-6">
              <strong>Total Transactions:</strong> {rows}
            </p>

            <div className="overflow-x-auto rounded-xl border border-slate-700">

              <table className="w-full text-sm">

                <thead className="bg-slate-800">

                  <tr>
                    <th className="p-3">Date</th>
                    <th className="p-3">Description</th>
                    <th className="p-3">Debit</th>
                    <th className="p-3">Credit</th>
                    <th className="p-3">Balance</th>
                  </tr>

                </thead>

                <tbody>

                  {transactions.map((item, index) => (

                    <tr
                      key={index}
                      className="border-t border-slate-700 hover:bg-slate-800 transition"
                    >

                      <td className="p-3 text-center">
                        {item.Date}
                      </td>

                      <td className="p-3">
                        {item.Description}
                      </td>

                      <td className="p-3 text-center text-red-400">
                        {item.Debit || "-"}
                      </td>

                      <td className="p-3 text-center text-green-400">
                        {item.Credit || "-"}
                      </td>

                      <td className="p-3 text-center">
                        {item.Balance}
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>
        )}

      </div>

    </div>
  );
}

export default Upload;