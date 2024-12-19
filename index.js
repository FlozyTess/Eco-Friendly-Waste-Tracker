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
    // Update Report Summary
    reportSummary.innerHTML = `
        <h3>Weekly Waste Report</h3>
        <p><strong>Recyclable:</strong> ${totals.Recyclable} kg</p>
        <p><strong>Compostable:</strong> ${totals.Compostable} kg</p>
        <p><strong>Non-Recyclable:</strong> ${totals["Non-Recyclable"]} kg</p>
    `;
}
// Display Eco Tips from db.json
function displayEcoTips(tips) {
    tipsContainer.innerHTML = "";
    tips.forEach((tip) => {
        const tipElement = document.createElement("p");
        tipElement.textContent = tip;
        tipsContainer.appendChild(tipElement);
    });
}
// Display Recycling Centers from db.json
function displayRecyclingCenters(centers) {
    centersList.innerHTML = "";
    centers.forEach((center) => {
        const centerElement = document.createElement("div");
        centerElement.className = "center";
        centerElement.innerHTML = `
            <h4>${center.name}</h4>
            <p><strong>Address:</strong> ${center.address}</p>
            <p><strong>Accepted Types:</strong> ${center.acceptedTypes.join(", ")}</p>
        `;
        centersList.appendChild(centerElement);
    });
}
// Integration with db.json (Simulated)
fetch("db.json")
    .then((response) => response.json())
    .then((data) => {
        // Display Eco Tips
        displayEcoTips(data.ecoTips.map((tipObj) => tipObj.tip));
// Display Recycling Centers
displayRecyclingCenters(data.recyclingCenters);
})
.catch((error) => console.error("Error loading db.json:", error));

