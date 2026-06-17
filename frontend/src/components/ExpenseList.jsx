function ExpenseList({
  expenses,
  deleteExpense,
  setEditingExpense,
}) {
  return (
    <div className="mt-8">
      <h2 className="text-3xl font-bold text-white mb-6">
        Recent Expenses
      </h2>

      {expenses.map((expense) => (
        <div
          key={expense.id}
          className="
w-full bg-white/10
backdrop-blur-xl
border
border-slate-700
rounded-3xl
p-6
mb-5
shadow-lg
transition-all
duration-300
hover:border-slate-600
hover:-translate-y-1
"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-2xl font-bold text-white">
                {expense.title}
              </h3>

              <span className="inline-block mt-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-sm">
                {expense.category}
              </span>
            </div>

            <div
className="
bg-green-500/20
text-green-400
px-4
py-2
rounded-xl
font-bold
text-xl
"
>
 ₹{expense.amount}
</div>
          </div>

          <div className="mt-5 flex gap-3">
            <button
              onClick={() => setEditingExpense(expense)}
              className="
px-4
py-2
rounded-xl
bg-white/5
border
border-white/10
text-slate-300
font-medium
hover:bg-blue-500/15
hover:text-blue-300
hover:border-blue-500/30
transition-all
duration-200
"
            >
              ✏️ Edit
            </button>

            <button
              onClick={() => deleteExpense(expense.id)}
             className="
px-4
py-2
rounded-xl
bg-white/5
border
border-white/10
text-slate-400
font-medium
hover:bg-red-500/10
hover:text-red-400
hover:border-red-500/20
transition-all
duration-200
"
            >
              🗑 Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ExpenseList;