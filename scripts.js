document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("expense-form");
    const titleInput = document.getElementById("title");
    const amountInput = document.getElementById("amount");
    const dateInput = document.getElementById("date");
    const expenseTable = document.getElementById("expense-table");
    const totalExpense = document.getElementById("total-expense");
  
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  
    const renderExpenses = () => {
      expenseTable.innerHTML = "";
      let total = 0;
  
      expenses.forEach((expense, index) => {
        total += parseFloat(expense.amount);
  
        const row = document.createElement("tr");
  
        row.innerHTML = `
          <td>${expense.title}</td>
          <td>$${expense.amount.toFixed(2)}</td>
          <td>${expense.date}</td>
          <td>
            <button class="action-btn edit-btn" onclick="editExpense(${index})">Edit</button>
            <button class="action-btn delete-btn" onclick="deleteExpense(${index})">Delete</button>
          </td>
        `;
  
        expenseTable.appendChild(row);
      });
  
      totalExpense.textContent = `Total Expense (USD): $${total.toFixed(2)}`;
      localStorage.setItem("expenses", JSON.stringify(expenses));
    };
  
    const addExpense = (title, amount, date) => {
      expenses.push({ title, amount: parseFloat(amount), date });
      renderExpenses();
    };
  
    const editExpense = (index) => {
      const expense = expenses[index];
      titleInput.value = expense.title;
      amountInput.value = expense.amount;
      dateInput.value = expense.date;
  
      expenses.splice(index, 1);
      renderExpenses();
    };
  
    const deleteExpense = (index) => {
      expenses.splice(index, 1);
      renderExpenses();
    };
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const title = titleInput.value;
      const amount = amountInput.value;
      const date = dateInput.value;
  
      if (title && amount && date) {
        addExpense(title, amount, date);
        form.reset();
      } else {
        alert("Please fill all fields.");
      }
    });
  
    renderExpenses();
  
    // Expose functions globally for button actions
    window.editExpense = editExpense;
    window.deleteExpense = deleteExpense;
  });
  
