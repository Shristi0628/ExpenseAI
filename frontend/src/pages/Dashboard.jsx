import { useMemo } from "react";
import SummaryCards from "../components/dashboard/SummaryCards";
import IncomeExpensePie from "../components/dashboard/IncomeExpensePie";
import ExpenseBarChart from "../components/dashboard/ExpenseBarChart";
function Dashboard() {
  const transactions = JSON.parse(
    localStorage.getItem("transactions") || "[]"
  );

  const summary = useMemo(() => {
    let income = 0;
    let expense = 0;
    let balance = 0;

    transactions.forEach((item) => {
      const credit = Number(item.Credit) || 0;
      const debit = Number(item.Debit) || 0;
      const currentBalance = Number(item.Balance) || 0;

      income += credit;
      expense += debit;

      balance = currentBalance;
    });

    return {
      income,
      expense,
      balance,
      totalTransactions: transactions.length,
    };
  }, [transactions]);

  return (
  <div className="min-h-screen bg-slate-950 text-white p-10">

    <h1 className="text-5xl font-bold mb-10">
      Dashboard
    </h1>

    <SummaryCards summary={summary} />

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">

      <IncomeExpensePie
        income={summary.income}
        expense={summary.expense}
      />

      <ExpenseBarChart transactions={transactions} />

    </div>

  </div>
);

}

export default Dashboard;