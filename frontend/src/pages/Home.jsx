import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center">

      <h1 className="text-6xl font-bold">
        💸 ExpenseAI
      </h1>

      <p className="mt-5 text-slate-400 text-xl">
        Your Personal AI Finance Assistant
      </p>

      <button
        onClick={() => navigate("/upload")}
        className="mt-10 bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-xl text-lg font-semibold transition"
      >
        Upload Statement
      </button>

    </div>
  );
}

export default Home;