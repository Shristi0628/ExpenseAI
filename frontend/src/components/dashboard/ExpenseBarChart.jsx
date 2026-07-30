import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

function ExpenseBarChart({ transactions }) {

  const data = transactions
    .filter((item) => Number(item.Debit) > 0)
    .map((item) => ({
      date: item.Date,
      expense: Number(item.Debit),
    }));

  return (
    <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-lg">

      <h2 className="text-2xl font-bold mb-6">
        Daily Expenses
      </h2>

      <div className="h-80">

        <ResponsiveContainer width="100%" height="100%">

          <BarChart data={data}>

            <XAxis dataKey="date" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="expense"
              fill="#ef4444"
              radius={[8,8,0,0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default ExpenseBarChart;