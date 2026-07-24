function Upload() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">
      <div className="w-full max-w-2xl rounded-3xl bg-slate-900 border border-slate-800 p-10 shadow-2xl">
        <h1 className="text-4xl font-bold text-center">
          Upload Statement
        </h1>

        <p className="text-center text-slate-400 mt-3">
          Upload your Bank Statement (PDF or Excel)
        </p>

        <div className="mt-10 h-64 rounded-2xl border-2 border-dashed border-slate-700 flex flex-col items-center justify-center">
          <p className="text-slate-300">
            Drag & Drop your file here
          </p>

          <p className="mt-2 text-slate-500">or</p>

          <button className="mt-5 rounded-xl bg-blue-600 px-6 py-3 hover:bg-blue-700 transition">
            Choose File
          </button>
        </div>
      </div>
    </div>
  );
}

export default Upload;