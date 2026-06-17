import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function PieChartComponent({ expenses }) {
  const categoryData = expenses.reduce((acc, expense) => {
    const existing = acc.find(
      (item) => item.name === expense.category
    );

    if (existing) {
      existing.value += expense.amount;
    } else {
      acc.push({
        name: expense.category,
        value: expense.amount,
      });
    }

    return acc;
  }, []);

  const COLORS = [
 "#3b82f6",
 "#8b5cf6",
 "#10b981",
 "#f59e0b",
 "#ef4444",
 "#06b6d4",
];

  return (

    <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20">
      <h2 className="text-2xl font-bold text-white mb-1">
  Expense Distribution
</h2>

<p className="text-slate-400 mb-6">
  Category-wise spending breakdown
</p>

      {categoryData.length === 0 ? (
        <p className="text-white/60 text-center py-10">
          No expenses to show yet.
        </p>
      ) : (
        <ResponsiveContainer width="100%" height={380}>
          <PieChart>
            <Pie
              data={categoryData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={120}
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
            >
              {categoryData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
  backgroundColor: "#0f172a",
  border: "1px solid #334155",
  borderRadius: "14px",
  color: "#fff",
  backdropFilter: "blur(10px)"
}}
            />
            <Legend
              wrapperStyle={{ color: "#fff" }}
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default PieChartComponent;