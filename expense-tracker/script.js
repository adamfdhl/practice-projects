const totalBalanceElm = document.getElementById("total-balance");
const totalIncomeElm = document.getElementById("total-income");
const totalExpensesElm = document.getElementById("total-expenses");
const lowBalanceElm = document.getElementById("low-balance");
const transactionListElm = document.getElementById("transaction-list");
const form = document.getElementById("form");
const descriptionForm = document.getElementById("description");
const amountForm = document.getElementById("amount");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

form.addEventListener("submit", submitFormTransaction);

function submitFormTransaction(e) {
  e.preventDefault();

  const descriptionVal = descriptionForm.value.trim();
  const amountVal = parseFloat(amountForm.value);

  transactions.push({
    id: Date.now(),
    description: descriptionVal,
    amount: amountVal,
  });

  localStorage.setItem("transactions", JSON.stringify(transactions));

  updateData();
  form.reset();
}

function updateAmountSummary() {
  const totalBalance = transactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0,
  );
  const totalIncome = transactions
    .filter((transaction) => transaction.amount >= 0)
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  const totalExpenses = transactions
    .filter((transaction) => transaction.amount < 0)
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  totalBalanceElm.textContent = formatCurrency(totalBalance);
  totalIncomeElm.textContent = formatCurrency(totalIncome);
  totalExpensesElm.textContent = formatCurrency(totalExpenses);

  if (totalBalance > 0 && totalBalance <= 100) {
    removeClass(totalBalanceElm, "total-balance");
    lowBalanceElm.classList.add("low");
  } else {
    // not low balance
    if (lowBalanceElm.classList.contains("low")) {
      removeClass(lowBalanceElm, "low");
    }
    if (!totalBalanceElm.classList.contains("total-balance")) {
      totalBalanceElm.classList.add("total-balance");
    }
  }
}

function createTransactionElm(transaction) {
  const transactionElm = document.createElement("li");
  transactionElm.classList.add("transaction");
  transactionElm.classList.add(transaction.amount >= 0 ? "income" : "expenses");

  const descElm = document.createElement("span");
  descElm.textContent = transaction.description;

  const deleteBtnElm = document.createElement("button");
  deleteBtnElm.textContent = "X";
  deleteBtnElm.classList.add("delete-btn");
  deleteBtnElm.onclick = () => deleteTransaction(transaction.id);

  const amountDescElm = document.createElement("span");
  amountDescElm.textContent = formatCurrency(transaction.amount);
  amountDescElm.appendChild(deleteBtnElm);

  transactionElm.appendChild(descElm);
  transactionElm.appendChild(amountDescElm);

  return transactionElm;
}

function updateTransactionList() {
  transactionListElm.innerHTML = "";

  const sortedTransactions = [...transactions].reverse();

  for (const transaction of sortedTransactions) {
    const transactionElm = createTransactionElm(transaction);
    transactionListElm.appendChild(transactionElm);
  }
}

function deleteTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);
  localStorage.setItem("transactions", JSON.stringify(transactions));

  updateData();
}

function formatCurrency(number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number);
}

function updateData() {
  updateAmountSummary();
  updateTransactionList();
}

document.addEventListener("DOMContentLoaded", () => {
  updateData();
});

// helper
function removeClass(el, className) {
  el.classList.remove(className);
  if (el.classList.length === 0) {
    el.removeAttribute("class");
  }
}
