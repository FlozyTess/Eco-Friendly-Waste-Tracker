// DOM Elements
const wasteForm = document.getElementById("waste-form");
const typeInput = document.getElementById("type");
const amountInput = document.getElementById("amount");
const logOutput = document.getElementById("log-output");
const reportSummary = document.getElementById("report-summary");
const tipsContainer = document.getElementById("tips-container");
const centersList = document.getElementById("centers-list");
// Base URL for JSON Server
const BASE_URL = "http://localhost:3000";

// Fetch Waste Logs from Server
function fetchWasteLogs() {
    fetch(`${BASE_URL}/wasteLogs`)
        .then((response) => response.json())
        .then((data) => {
            wasteLogs = data;
            wasteLogs.forEach((log, index) => displayLog(log, index));
            generateWeeklyReport();
        })
        .catch((error) => console.error("Error fetching waste logs:", error));
}

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
    // Post new log entry to server
    fetch(`${BASE_URL}/wasteLogs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(logEntry),
    })
        .then((response) => response.json())
        .then((newLog) => {
            displayLog(newLog);
            wasteLogs.push(newLog);
            generateWeeklyReport();
            wasteForm.reset();
        })
        .catch((error) => console.error("Error logging waste:", error));
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
function displayLog(logEntry,index) {
    const logElement = document.createElement("div");
    logElement.className = "log-entry";
    logElement.innerHTML = `
        <h4>Log #${index + 1}</h4>
        <p><strong>Date:</strong> ${logEntry.date}</p>
        <p><strong>Type:</strong> ${logEntry.type}</p>
        <p><strong>Amount:</strong> ${logEntry.amount} kg</p>
        <p><strong>Category:</strong> ${logEntry.category}</p>
        <button class="delete-button" data-id="${logEntry.id}">Delete</button>
    `;
    
    logOutput.appendChild(logElement);
    const suggestions = logEntry.suggestions || ["No suggestions available"];
suggestions.forEach((suggestion) => {
    logElement.innerHTML += `<p><strong>Suggestion:</strong> ${suggestion}</p>`;
     // Add event listener to delete button
     const deleteButton = logElement.querySelector(".delete-button");
     deleteButton.addEventListener("click", () => deleteLog(logEntry.id, logElement));
});
function deleteLog(id, logElement) {
    fetch(`${BASE_URL}/wasteLogs/${id}`, {
        method: "DELETE",
    })
        .then((response) => {
            if (response.ok) {
                logElement.remove(); // Remove log from DOM
                alert("Log deleted successfully.");
                // Optionally refresh the weekly report
                generateWeeklyReport();
            } else {
                alert("Failed to delete log. Please try again.");
            }
        })
        .catch((error) => console.error("Error deleting log:", error));
}    
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
// Fetch Eco Tips
function fetchEcoTips() {
    fetch(`${BASE_URL}/ecoTips`)
        .then((response) => response.json())
        .then((tips) => displayEcoTips(tips.map((tip) => tip.tip)))
        .catch((error) => console.error("Error fetching eco tips:", error));
}
// Display Eco Tips from db.json
function displayEcoTips(tips) {
    tipsContainer.innerHTML = "";
    tips.forEach((tip,index) => {
        const tipElement = document.createElement("p");
        tipElement.textContent = `Tip #${index + 1}: ${tip}`;
        tipsContainer.appendChild(tipElement);
    });
}
// Fetch Recycling Centers
function fetchRecyclingCenters() {
    fetch(`${BASE_URL}/recyclingCenters`)
        .then((response) => response.json())
        .then((centers) => displayRecyclingCenters(centers))
        .catch((error) => console.error("Error fetching recycling centers:", error));
}
// Display Recycling Centers from db.json
function displayRecyclingCenters(centers) {
    centersList.innerHTML = "";
    centers.forEach((center,index) => {
        const centerElement = document.createElement("div");
        centerElement.className = "center";
        centerElement.innerHTML = `
            <h4>Center #${index + 1}:${center.name}</h4>
            <p><strong>TypesAccepted:</strong> ${center.typesAccepted.join(", ")}</p>
        `;
        centersList.appendChild(centerElement);
    });
}
// Initialize App
function init() {
    fetchWasteLogs();
    fetchEcoTips();
    fetchRecyclingCenters();
    setInterval(generateWeeklyReport, 60000); // Update report every minute
}

init();