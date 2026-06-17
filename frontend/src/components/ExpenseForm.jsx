import { useState, useEffect } from "react";
import axios from "axios";

function ExpenseForm({
  fetchExpenses,
  editingExpense,
  setEditingExpense,
}) {

  const [title, setTitle] = useState("");
const [amount, setAmount] = useState("");
const [category, setCategory] = useState("");

  useEffect(() => {
  if (editingExpense) {
    setTitle(editingExpense.title);
    setAmount(editingExpense.amount);
    setCategory(editingExpense.category);
  }
}, [editingExpense]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !amount || !category) {
      alert("Sab kuch fill karo!");
      return;
    }

    try {
      if (editingExpense) {
  await axios.put(
    `https://expensetracker-1-dqim.onrender.com/expenses/${editingExpense.id}`,
    {
      title,
      amount: Number(amount),
      category,
    }
  );

  fetchExpenses();

  setEditingExpense(null);

  setTitle("");
  setAmount("");
  setCategory("");

  return;
}

      await axios.post("https://expensetracker-1-dqim.onrender.com/expenses", {
        title,
        amount: Number(amount),
        category,
      });

      fetchExpenses();

      

      alert("Expense Added");

      setTitle("");
      setAmount("");
      setCategory("");
    } catch (error) {
      console.log(error);
      alert("Kuch gadbad ho gayi, dobara try karo");
    }
  };

  return (
    <form
  onSubmit={handleSubmit}
  className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 mb-8 shadow-2xl"
>
  <h2 className="text-3xl font-bold text-white mb-6">
  {editingExpense ? "✏️ Update Expense" : "➕ Add Expense"}
</h2>

    <p className="text-slate-300 mb-6">
  Track your spending and manage expenses efficiently.
</p>

  <input
    type="text"
    placeholder="Title"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    className="w-full bg-white/10 border border-white/20 text-white placeholder-slate-400 p-4 rounded-xl mb-4 outline-none focus:border-cyan-400"
  />

  <input
    type="number"
    placeholder="Amount"
    value={amount}
    onChange={(e) => setAmount(e.target.value)}
    className="w-full bg-white/10 border border-white/20 text-white placeholder-slate-400 p-4 rounded-xl mb-4 outline-none focus:border-cyan-400"
  />

  <input
    type="text"
    placeholder="Category"
    value={category}
    onChange={(e) => setCategory(e.target.value)}
    className="w-full bg-white/10 border border-white/20 text-white placeholder-slate-400 p-4 rounded-xl mb-4 outline-none focus:border-cyan-400"
  />

  <button
  type="submit"
  className="
w-full
bg-gradient-to-r
from-cyan-500
to-blue-500
text-white
font-bold
p-4
rounded-xl
hover:scale-[1.02]
transition-all
duration-300
"
>
  {editingExpense ? "Update Expense" : "Add Expense"}
</button>
</form>
  );
}

export default ExpenseForm;

