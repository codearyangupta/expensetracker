
import { useEffect, useState } from "react";
import axios from "axios";

import PieChartComponent from "./components/PieChartComponent";

import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";


const API_URL = "https://expensetracker-1-dqim.onrender.com/";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
const [selectedCategory, setSelectedCategory] = useState("All");

  const fetchExpenses = async () => {
    try {
      const response = await axios.get(
        "https://expensetracker-1-dqim.onrender.com//expenses"
      );

      setExpenses(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteExpense = async (id) => {
  try {
    await axios.delete(
      `https://expensetracker-1-dqim.onrender.com//expenses/${id}`
    );

    fetchExpenses();
  } catch (error) {
    console.log(error);
  }
};

  const updateExpense = async (id, updatedData) => {
  try {
    await axios.put(
      `https://expensetracker-1-dqim.onrender.com//expenses/${id}`,
      updatedData
    );

    fetchExpenses();
  } catch (error) {
    console.log(error);
  }
};

  useEffect(() => {
    fetchExpenses();
    
  }, []);

  const totalExpense = expenses.reduce(
  (sum, expense) => sum + expense.amount,
  0
);

const highestExpense =
  expenses.length > 0
    ? Math.max(...expenses.map(e => e.amount))
    : 0;

const recentExpense =
  expenses.length > 0
    ? expenses[expenses.length - 1]
    : null;

    const categoryTotals = {};

expenses.forEach((expense) => {
  categoryTotals[expense.category] =
    (categoryTotals[expense.category] || 0)
    + expense.amount;
});

const topCategory =
  Object.keys(categoryTotals).length > 0
    ? Object.keys(categoryTotals).reduce(
        (a, b) =>
          categoryTotals[a] >
          categoryTotals[b]
            ? a
            : b
      )
    : "-";

  const categories = [
  "All",
  ...new Set(expenses.map(expense => expense.category))
];

  const filteredExpenses = expenses.filter((expense) => {
  const matchesSearch =
    expense.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

  const matchesCategory =
    selectedCategory === "All" ||
    expense.category === selectedCategory;

  return matchesSearch && matchesCategory;
});

  

    return (
  <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">

    {/* <div className="max-w-7xl mx-auto p-8"> */}
      <div className="max-w-6xl mx-auto px-6 py-10">

      <div className="mb-10">
  <h1 className="text-6xl font-extrabold text-white tracking-tight">
    Expense Tracker
  </h1>

  <p className="text-slate-400 mt-3 text-lg">
    Manage expenses, analyze spending and stay in control.
  </p>
</div>

      {/* Stats Section */}

      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20">
          <h3 className="text-slate-300">
            Total Expense
          </h3>

          <p className="text-4xl font-bold text-rose-300 mt-2">
            ₹{totalExpense}
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20">
          <h3 className="text-slate-300">
            Transactions
          </h3>

          <p className="text-4xl font-bold text-white mt-2">
            {expenses.length}
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20">
          <h3 className="text-slate-300">
            Categories
          </h3>

          <p className="text-4xl font-bold text-white mt-2">
            {
              [...new Set(
                expenses.map(
                  (expense) => expense.category
                )
              )].length
            }
          </p>
        </div>

      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">

  <div className="bg-white/10 border border-slate-700 rounded-3xl p-6">
    <h3 className="text-slate-400">
      Top Category
    </h3>

    <p className="text-violet-300 text-2xl font-bold mt-2">
  {topCategory}
</p>
  </div>

  <div className="bg-white/10 border border-slate-700 rounded-3xl p-6">
    <h3 className="text-slate-400">
      Highest Expense
    </h3>

   <p className="text-emerald-300 text-2xl font-bold mt-2">
  ₹{highestExpense}
</p>
  </div>

  <div className="bg-white/10 border border-slate-700 rounded-3xl p-6">
  <h3 className="text-slate-400">
    Recent Expense
  </h3>

  <p className="text-violet-300 text-xl font-bold mt-2 truncate">
  {recentExpense?.title || "-"}
</p>

  <p className="text-amber-400 mt-1 font-medium">
    ₹{recentExpense?.amount || 0}
  </p>
</div>

</div>

      <ExpenseForm
        fetchExpenses={fetchExpenses}
        editingExpense={editingExpense}
        setEditingExpense={setEditingExpense}
      />

      <div className="flex flex-col md:flex-row gap-4 mb-8">

  <input
    type="text"
    placeholder="Search expenses..."
    value={searchTerm}
    onChange={(e) =>
      setSearchTerm(e.target.value)
    }
    className="
    flex-1
    bg-slate-900/70
    border
    border-slate-700
    rounded-2xl
    p-4
    text-white
    outline-none
    focus:border-cyan-400
    "
  />

  <select
    value={selectedCategory}
    onChange={(e) =>
      setSelectedCategory(e.target.value)
    }
    className="
    bg-slate-900/70
    border
    border-slate-700
    rounded-2xl
    px-4
    text-white
    outline-none
    focus:border-cyan-400
    "
  >
    {categories.map(category => (
      <option
        key={category}
        value={category}
      >
        {category}
      </option>
    ))}
  </select>

</div>

      <PieChartComponent expenses={expenses} />

      <ExpenseList
        expenses={filteredExpenses}
        deleteExpense={deleteExpense}
        setEditingExpense={setEditingExpense}
      />

    </div>
  </div>
);
  

  
}

export default App;