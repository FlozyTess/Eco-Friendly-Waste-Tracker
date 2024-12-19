// DOM Elements
const wasteForm = document.getElementById("waste-form");
const typeInput = document.getElementById("type");
const amountInput = document.getElementById("amount");
const logOutput = document.getElementById("log-output");
const reportSummary = document.getElementById("report-summary");
const tipsContainer = document.getElementById("tips-container");
const centersList = document.getElementById("centers-list");
// Data Storage
let wasteLogs = []; // Stores waste logs
// Event Listener for Logging Waste
wasteForm.addEventListener("submit", (event) => {
    event.preventDefault();
    // Input Validation
    const type = typeInput.value;
    const amount = parseFloat(amountInput.value);
    if (!type || isNaN(amount) || amount <= 0) {
        alert("Please enter valid waste type and amount.");
        return;
    }
    // Log Waste Entry
    const logEntry = {
        id: wasteLogs.length + 1,
        date: new Date().toISOString().split("T")[0],
        type,
        amount,
        category: categorizeWaste(type),
    };
    wasteLogs.push(logEntry);
    displayLog(logEntry);

    // Clear Form
    wasteForm.reset();
});
