
// Get form and button elements
const localTransferBtn = document.getElementById('localTransferBtn');
const foreignTransferBtn = document.getElementById('foreignTransferBtn');
const localTransferForm = document.getElementById('localTransferForm');
const foreignTransferForm = document.getElementById('foreignTransferForm');

// Add event listeners for buttons
localTransferBtn.addEventListener('click', () => {
    // Show local form and hide foreign form
    localTransferForm.classList.add('active');
    foreignTransferForm.classList.remove('active');
    localTransferBtn.classList.add('active');
    foreignTransferBtn.classList.remove('active');
});

foreignTransferBtn.addEventListener('click', () => {
    // Show foreign form and hide local form
    foreignTransferForm.classList.add('active');
    localTransferForm.classList.remove('active');
    foreignTransferBtn.classList.add('active');
    localTransferBtn.classList.remove('active');
});

// Handle local form submission
localTransferForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Local Transfer Submitted!');
    localTransferForm.reset();
});

// Handle foreign form submission
foreignTransferForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Foreign Transfer Submitted!');
    foreignTransferForm.reset();
});


// Function to save transaction to local storage
function saveTransaction(type, details) {
    // Retrieve existing transactions or initialize an empty array
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];

    // Add the new transaction to the array
    transactions.push({ type, ...details, date: new Date().toLocaleString() });

    // Save updated transactions back to localStorage
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

let localAmount = document.getElementById('localAmount')
// Handle Local Transfer Submission
localTransferForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const details = {
        recipient: localAccountNumber.value,
        amount: localAmount.value,
        pin: localPin.value
    };

    const dataToSubstractFrom = localStorage.getItem('initialAmount')
    if (localAmount.value > dataToSubstractFrom) {
        alert('insusficient funds')
    }
    // saveTransaction('Local Transfer', details);
    // alert('Local Transfer Submitted await response!');
    localTransferForm.reset();
});

// Handle Foreign Transfer Submission
foreignTransferForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const details = {
        recipientIBAN: foreignAccountNumber.value,
        bankName: foreignBankName.value,
        amount: foreignAmount.value,
        pin: foreignPin.value
    };

    saveTransaction('Foreign Transfer', details);
    alert('Foreign Transfer Submitted!');
    foreignTransferForm.reset();
});


// Function to display transactions from local storage
function displayTransactions() {
    const transactionHistoryContainer = document.getElementById('transactionHistory');
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];

    // if (transactions.length === 0) {
    //     transactionHistoryContainer.innerHTML = '<p>No transactions found.</p>';
    //     return;
    // }

    transactions.forEach((transaction, index) => {
        const transactionElement = document.createElement('tr');
        transactionElement.classList.add('transaction');

        transactionElement.innerHTML = `
            <td><strong>${index + 1}. ${transaction.type}</strong></td>
            <td>Recipient: ${transaction.recipient || transaction.recipientIBAN}</td>
            <td>Bank Name: ${transaction.bankName || 'N/A'}</td>
            <td>Amount: ${transaction.amount}</td>
            <td>Date: ${transaction.date}</td>
        `;

        transactionHistoryContainer.appendChild(transactionElement);
    });
}

// Call the display function on page load
document.addEventListener('DOMContentLoaded', displayTransactions);


const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
const historyTable = document.getElementById('historyTable');

if (transactions.length === 0) {
    const row = historyTable.insertRow();
    const cell = row.insertCell(0);
    cell.colSpan = 3;
    cell.textContent = 'No transactions found.';
    cell.style.textAlign = 'center';
} else {
    transactions
}