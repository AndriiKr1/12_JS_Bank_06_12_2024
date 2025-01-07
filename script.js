const bank = [];

// Debit card
// deposit: если вносимая сумма больше 5000 - действие не совершается
// withdraw: нельзя уходить в минус
const bankAccount = {
  accountNumber: "123456789",
  accountHolderName: "Alice",
  balance: 0,
  deposit(sum) {
    // TODO
    sum >= 5 && sum <= 5000
      ? (this.balance += sum)
      : alert("Вводимая сумма для пополнения баланса некорректная");
  },
  withdraw(sum) {
    // TODO
    sum <= this.balance && sum > 0
      ? this.balance -= sum
      : alert("Вводимая сумма для снятия баланса некорректная");
  },
  checkBalance() {
    alert(this.balance + "€");
  },
};

// bankAccount.deposit(100);
// console.log(bankAccount.balance);

// bankAccount.withdraw(50);
// console.log(bankAccount.balance);

function createAccount() {
  const nameInput = document.getElementById('name');
  const name = nameInput.value.trim();

  if (name) {
    bank.push({
      ...bankAccount,
      accountNumber: `${bank.length + 1}`,
      accountHolderName: name
    });  
    updateAccountsList();
  } else {
    alert("Enter your name");
  }

  nameInput.value = '';
}

function showAccounts() {
  updateAccountsList();
}

function updateAccountsList() {
  const accountList = document.getElementById('accountList');
  const showSection = document.getElementById('show');

  accountList.innerHTML = '';

  if (bank.length > 0) {
    showSection.style.display = 'block';
    for (const account of bank) {
      const li = document.createElement('li');
      li.textContent = `ID: ${account.accountNumber}, Name: ${account.accountHolderName}, Balance: ${account.balance}`;
      accountList.appendChild(li);
    }
  } else {
    showSection.style.display = 'none';
  }
}

// HW
// event listener

const withdrawBtn = document.getElementById('withdraw');
const depositBtn = document.getElementById('deposit');

withdrawBtn.onclick = function () {
  // TODO (описание события клика на withdrawBtn)
  const accountIdInput = document.getElementById('accountId'); 
  const amountInput = document.getElementById('amount'); 

  const accountId = accountIdInput.value.trim();
  const amount = amountInput.value.trim();

  // Перевірка на порожні поля та коректність суми
  if (!accountId || !amount || +amount <= 0) {
    alert("Некоректно введені дані для зняття.");
    return;
  }

  const account = bank.find(acc => acc.accountNumber === accountId);

  if (account) {
    account.withdraw(+amount); // перетворюємо amount на число
    updateAccountsList();
    alert("Сума знята успішно!");
  } else {
    alert("Акаунт із таким ID не знайдено.");
  }

  accountIdInput.value = '';
  amountInput.value = '';
}


depositBtn.onclick = function () {
  // TODO (описание события клика на depositBtn)
  const accountIdInput = document.getElementById('accountId'); // Поле для введення ID акаунта
  const amountInput = document.getElementById('amount'); // Поле для введення суми

  const accountId = accountIdInput.value.trim();
  const amount = amountInput.value.trim();

  // Перевірка на порожні поля та коректність суми
  if (!accountId || !amount || +amount <= 0) {
    alert("Некоректно введені дані для поповнення.");
    return;
  }

  const account = bank.find(acc => acc.accountNumber === accountId);

  if (account) {
    account.deposit(+amount); // перетворюємо amount на число
    updateAccountsList();
    alert("Баланс поповнено успішно!");
  } else {
    alert("Акаунт із таким ID не знайдено.");
  }

  accountIdInput.value = '';
  amountInput.value = '';
}