import { useMemo } from "react";
import { extractPerson } from "../utils/extractPerson";

function People() {
  const transactions = JSON.parse(
    localStorage.getItem("transactions") || "[]"
  );

  // Overall person-wise data
  const peopleData = useMemo(() => {
    const people = {};

    transactions.forEach((item) => {
      const person = extractPerson(item.Description);
      const amount = Number(item.Debit) || 0;

      if (!person || amount === 0) return;

      if (!people[person]) {
        people[person] = {
          name: person,
          totalPaid: 0,
          transactions: 0,
          lastPayment: item.Date,
        };
      }

      people[person].totalPaid += amount;
      people[person].transactions += 1;
      people[person].lastPayment = item.Date;
    });

    return Object.values(people).sort(
      (a, b) => b.totalPaid - a.totalPaid
    );
  }, [transactions]);

  // Monthly person-wise data
  const monthlyData = useMemo(() => {
    const data = {};

    transactions.forEach((item) => {
      const person = extractPerson(item.Description);
      const amount = Number(item.Debit) || 0;

      if (!person || amount === 0 || !item.Date) return;

      const date = new Date(item.Date);

      if (isNaN(date.getTime())) return;

      const month = date.toLocaleString("en-US", {
        month: "short",
        year: "numeric",
      });

      if (!data[person]) {
        data[person] = {};
      }

      if (!data[person][month]) {
        data[person][month] = 0;
      }

      data[person][month] += amount;
    });

    return data;
  }, [transactions]);

  // Get all months
  const months = useMemo(() => {
    const monthSet = new Set();

    Object.values(monthlyData).forEach((person) => {
      Object.keys(person).forEach((month) => {
        monthSet.add(month);
      });
    });

    return Array.from(monthSet).sort(
      (a, b) => new Date(a) - new Date(b)
    );
  }, [monthlyData]);

  const topPerson =
    peopleData.length > 0 ? peopleData[0] : null;

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">

      <h1 className="text-5xl font-bold mb-8">
        People Payments
      </h1>

      {/* Top Spending Person */}
      {topPerson && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8">

          <p className="text-slate-400">
            Top Spending Person
          </p>

          <div className="flex justify-between items-center mt-3">

            <div>
              <h2 className="text-3xl font-bold">
                👤 {topPerson.name}
              </h2>

              <p className="text-slate-400 mt-1">
                {topPerson.transactions} Transactions
              </p>
            </div>

            <h2 className="text-4xl font-bold text-red-400">
              ₹ {topPerson.totalPaid.toLocaleString()}
            </h2>

          </div>

        </div>
      )}

      {/* Overall People Table */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-800">
            <tr>
              <th className="p-4 text-left">Person</th>
              <th className="p-4 text-center">Transactions</th>
              <th className="p-4 text-center">Last Payment</th>
              <th className="p-4 text-right">Total Paid</th>
            </tr>
          </thead>

          <tbody>

            {peopleData.map((person, index) => (
              <tr
                key={index}
                className="border-t border-slate-800 hover:bg-slate-800 transition"
              >
                <td className="p-4 font-semibold">
                  👤 {person.name}
                </td>

                <td className="p-4 text-center">
                  {person.transactions}
                </td>

                <td className="p-4 text-center text-slate-400">
                  {person.lastPayment}
                </td>

                <td className="p-4 text-right text-red-400 font-bold">
                  ₹ {person.totalPaid.toLocaleString()}
                </td>
              </tr>
            ))}

            {peopleData.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  className="text-center p-8 text-slate-400"
                >
                  No person payments found.
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>

      {/* Monthly Payments */}
      <div className="mt-10">

        <h2 className="text-3xl font-bold mb-6">
          Monthly Payments
        </h2>

        <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-x-auto">

          <table className="w-full">

            <thead className="bg-slate-800">

              <tr>
                <th className="p-4 text-left">
                  Person
                </th>

                {months.map((month) => (
                  <th
                    key={month}
                    className="p-4 text-right whitespace-nowrap"
                  >
                    {month}
                  </th>
                ))}

                <th className="p-4 text-right">
                  Total
                </th>
              </tr>

            </thead>

            <tbody>

              {peopleData.map((person) => {

                const personMonths =
                  monthlyData[person.name] || {};

                const total = Object.values(personMonths).reduce(
                  (sum, amount) => sum + amount,
                  0
                );

                return (
                  <tr
                    key={person.name}
                    className="border-t border-slate-800 hover:bg-slate-800 transition"
                  >

                    <td className="p-4 font-semibold">
                      👤 {person.name}
                    </td>

                    {months.map((month) => (
                      <td
                        key={month}
                        className="p-4 text-right"
                      >
                        {personMonths[month]
                          ? `₹ ${personMonths[month].toLocaleString()}`
                          : "-"}
                      </td>
                    ))}

                    <td className="p-4 text-right font-bold text-red-400">
                      ₹ {total.toLocaleString()}
                    </td>

                  </tr>
                );
              })}

              {peopleData.length === 0 && (
                <tr>
                  <td
                    colSpan={months.length + 2}
                    className="p-8 text-center text-slate-400"
                  >
                    No monthly payment data found.
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default People;