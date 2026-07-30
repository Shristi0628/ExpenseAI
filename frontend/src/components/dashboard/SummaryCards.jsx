function SummaryCards({ summary }) {
  const cards = [
    {
      title: "Current Balance",
      value: summary.balance,
      color: "text-green-400",
      icon: "💰",
    },
    {
      title: "Total Income",
      value: summary.income,
      color: "text-green-500",
      icon: "📈",
    },
    {
      title: "Total Expense",
      value: summary.expense,
      color: "text-red-400",
      icon: "📉",
    },
    {
      title: "Transactions",
      value: summary.totalTransactions,
      color: "text-blue-400",
      icon: "📄",
      isCount: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-slate-900 rounded-2xl p-6 shadow-lg border border-slate-800 hover:border-blue-500 transition"
        >
          <div className="flex justify-between items-center">
            <p className="text-slate-400">{card.title}</p>
            <span className="text-3xl">{card.icon}</span>
          </div>

          <h2 className={`text-3xl font-bold mt-4 ${card.color}`}>
            {card.isCount
              ? card.value
              : `₹ ${Number(card.value).toLocaleString()}`}
          </h2>
        </div>
      ))}
    </div>
  );
}

export default SummaryCards;