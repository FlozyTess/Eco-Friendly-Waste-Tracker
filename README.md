# Eco-Friendly-Waste-Tracker
## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)
##  Introduction
This web application helps users track their daily waste, categorize it into recyclable, compostable, or non-recyclable types, and offers actionable suggestions to reduce environmental impact.
##  Features
 1. Waste Logging: Users input daily waste (type, amount, category) which is logged in memory or stored in localStorage.
 2. Category Classification: Waste is categorized into Recyclable, Compostable, and Non-Recyclable types.
 3. Weekly Report: Generates a report summarizing the total waste per category, with eco-friendly suggestions.
 4. Suggestions: Offers personalized tips based on the waste type (e.g., "Use reusable bags to reduce plastic waste").
 5. Recycling Centers: Provides nearby recycling centers that accept different waste types (retrieved from db.json).
 6. Eco Tips: Display tips for reducing waste and living more sustainably.

## Technologies Used
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** JSON Server for API simulation
## Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/ecofriendly-waste-tracker.git
   cd ecofriendly-waste-tracker
   ```

2. Install JSON Server globally if not already installed:
   ```bash
   npm install -g json-server
   ```

3. Start the JSON Server:
   ```bash
   json-server --watch db.json --port 3000
   ```

4. Open `index.html` in your browser to use the application.
## Usage
1. Log your waste by filling out the form with type and amount.
2. View your waste logs and their respective categories.
3. Check eco-friendly tips and nearby recycling centers for guidance.
4. Review the weekly report to understand your waste habits.
