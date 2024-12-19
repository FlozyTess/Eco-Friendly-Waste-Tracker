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
// Categorize Waste Based on Type
function categorizeWaste(type) {
    const recyclable = ["Plastic", "Glass", "Paper", "Metal"];
    const compostable = ["Food Waste"];
    return recyclable.includes(type)
        ? "Recyclable"
        : compostable.includes(type)
        ? "Compostable"
        : "Non-Recyclable";
}
// Display Log Entry
function displayLog(logEntry) {
    const logElement = document.createElement("div");
    logElement.className = "log-entry";
    logElement.innerHTML = `
        <p><strong>Date:</strong> ${logEntry.date}</p>
        <p><strong>Type:</strong> ${logEntry.type}</p>
        <p><strong>Amount:</strong> ${logEntry.amount} kg</p>
        <p><strong>Category:</strong> ${logEntry.category}</p>
    `;
    logOutput.appendChild(logElement);
}
// Generate Weekly Report
function generateWeeklyReport() {
    const totals = { Recyclable: 0, Compostable: 0, "Non-Recyclable": 0 };

    wasteLogs.forEach((log) => {
        totals[log.category] += log.amount;
    });
