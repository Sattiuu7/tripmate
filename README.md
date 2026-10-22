# TripMate – AI-Powered Budget Travel Planner

> **“Your Dream Trip, Within Your Budget.”**  
> *Plan smarter, spend less, and explore more.*

TripMate is a full-stack modern travel-planning web application built specifically for budget-conscious travellers, students, solo backpackers, and families traveling across India. It eliminates guesswork by providing accurate budget formulas, interactive day-wise itineraries, verified budget accommodations, authentic local eateries, and sustainable travel recommendations.

---

## 🌟 Highlights & Key Features

1. **Smart Trip Planning Wizard**:
   - Collects starting city, destination, departure date, travellers, duration (1–14 days), total budget in Indian Rupees (₹), travel style (Budget Backpacker, Standard Explorer, Comfort Seeker), accommodation preference (Hostel, Homestay, Hotel), transport preference (Train, Bus, Flight, Car), and dietary preferences (Veg, Vegan, Non-Veg).
   - Live validation with instant per-person per-day affordability indicators.

2. **Accurate Budget Calculation Engine**:
   - Divides budget into 6 realistic allocations: Accommodation (30%), Intercity Transport (22%), Food & Beverages (22%), Sightseeing (12%), Local Transport (8%), and Emergency Reserve (6%).
   - Avoids double-counting: accounts for shared hotel/homestay rooms (`Math.ceil(travellers / 2)`) vs individual hostel beds.
   - Per-person, per-day, and surplus/deficit metrics with clear "Within Budget" or "Over Budget" status badges.
   - Interactive sliders allowing users to dynamically adjust allocation percentages and see instant live recalculation.

3. **Interactive Day-Wise Itinerary Generator**:
   - Time-slotted schedule: Morning Activity, Breakfast Spot, Afternoon Sightseeing, Budget Lunch, Evening Cultural Stroll, and Dinner.
   - Arranges nearby attractions together to minimize local transit times and fuel costs.
   - Displays verified opening hours, approximate travel times, and entry ticket fees (highlighting free natural viewpoints and heritage passes).
   - **Full In-Browser Interactivity**: Add custom activities, edit notes, and remove stops with immediate recalculation.

4. **"Make My Trip Cheaper 💡" Optimizer**:
   - Analyzes your current itinerary and proposes realistic cost-saving swaps (e.g., swapping a hotel for a verified Zostel saves ₹X, switching from private flight/cab to express train saves ₹Y, utilizing electric public transit saves ₹Z).
   - 1-click swap actions that update the plan immediately without compromising safety.

5. **On-Trip Expense Tracker 🧾**:
   - Interactive modal to log real out-of-pocket expenses across categories (Stay, Food, Transit, Tickets, Shopping) against the allocated budget.

6. **Interactive Leaflet + OpenStreetMap Navigator**:
   - Color-coded custom SVG markers:
     - 🏨 Blue: Hostels & Stays
     - 🍽️ Orange: Local Eateries & Thalis
     - 🏛️ Green: Attractions & Heritage Monuments
   - Popups with photos, verified entry fees, and opening hours.
   - Category filter toggles (All, Hotels only, Food only, Attractions only) and an accessible List-View alternative.

7. **Live Weather Integration (Open-Meteo API)**:
   - Fetches live temperature and forecast using destination GPS coordinates without requiring paid API keys, with offline fallback resilience.

8. **Sustainable Tourism (UN SDG 8 & SDG 12)**:
   - **SDG 8 (Decent Work & Economic Growth)**: Directly spotlights local homestays, licensed local guides, and indigenous handicraft artisans.
   - **SDG 12 (Responsible Consumption & Production)**: Provides actionable eco-tips on each day's plan (plastic-free water refilling, electric transit, and zero-waste dining).

9. **Trip Persistence & PDF Export**:
   - Save trips to backend JSON storage and local storage.
   - Reopen saved trips, edit them, export as JSON, or print/download as a clean PDF travel voucher.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Backend Engine** | **Java 17 (OpenJDK Temurin)**, Multi-Threaded HTTP REST Server, Pure OOP Architecture |
| **Frontend Framework** | **React 19**, Vite 8, Tailwind CSS v4, Lucide React Icons |
| **Interactive Maps** | **Leaflet 1.9**, React-Leaflet, OpenStreetMap Tiles |
| **Charts & Analytics**| **Recharts 3** (Donut & Comparison Bar Charts) |
| **Data Persistence** | Dual-layer: Persistent File Storage (`data/saved_trips.json`) + Browser `localStorage` |
| **External APIs** | **Open-Meteo API** (Live Weather & Temperature) |
| **Design System** | Deep Navy (`#0F172A`), Teal (`#0D9488`), Warm Yellow (`#F59E0B`), Crisp Slate, Glassmorphism |

---

## 📁 Project Directory Structure

```text
c:/java mini proj/
├── backend/
│   ├── package.json               # Backend dependencies (express, cors, dotenv, axios)
│   ├── src/
│   │   ├── server.js              # Express server entry point (port 5000)
│   │   ├── data/
│   │   │   └── destinations.js    # Curated Indian destinations dataset
│   │   ├── routes/
│   │   │   └── api.js             # REST API routes (/destinations, /trips, /budget, /weather)
│   │   └── services/
│   │       ├── budgetEngine.js    # Budget formulas and cost-saving optimizer
│   │       ├── plannerService.js  # Day-wise itinerary generation algorithm
│   │       └── weatherService.js  # Open-Meteo live weather integration
│   └── data/
│       └── saved_trips.json       # Persisted saved trips catalog
├── frontend/
│   ├── index.html                 # TripMate HTML with Plus Jakarta Sans & Inter fonts
│   ├── package.json               # Frontend dependencies (react, tailwindcss, leaflet, recharts)
│   ├── vite.config.js             # Vite configuration with proxy to port 5000
│   └── src/
│       ├── main.jsx               # React DOM entry
│       ├── App.jsx                # Main application state and view router
│       ├── index.css              # Tailwind CSS v4 directives & glassmorphism tokens
│       ├── components/
│       │   ├── Navbar.jsx         # Navigation bar with saved count badge
│       │   ├── Footer.jsx         # Footer with quick links & SDG pledge
│       │   ├── DestinationCard.jsx# Destination card with budget metric preview
│       │   ├── InteractiveMap.jsx # Leaflet map with custom SVG icons & list-view
│       │   ├── BudgetChart.jsx    # Recharts Donut & Bar chart + allocation sliders
│       │   ├── CheaperModal.jsx   # "Make My Trip Cheaper" recommendations modal
│       │   └── ExpenseTrackerModal.jsx # On-trip expense logging modal
│       ├── pages/
│       │   ├── HomePage.jsx       # Hero, Quick Estimator, Destination Grid, How it Works
│       │   ├── PlanTripPage.jsx   # Validated smart planning form
│       │   ├── TripResultPage.jsx # Flagship itinerary tabs, weather, and actions
│       │   ├── SavedTripsPage.jsx # Catalog of saved trips with JSON export
│       │   └── AboutPage.jsx      # SDG 8 / 12 details & architecture overview
│       └── utils/
│           └── api.js             # Client API service with offline fallbacks
├── start.sh                       # 1-click Linux / macOS launcher script
├── start.bat                      # 1-click Windows launcher script
├── package.json                   # Root orchestrator scripts
└── README.md                      # Comprehensive documentation
```

---

## 🚀 How to Run the Project on Linux

Follow these step-by-step terminal instructions to run TripMate on any Linux distribution (Ubuntu, Debian, Fedora, Arch, etc.):

### Step 1: Prerequisites
Ensure Node.js (version 18 or higher) and npm are installed on your Linux machine:
```bash
node -v
npm -v
```
*(If not installed, run `sudo apt update && sudo apt install -y nodejs npm` on Ubuntu/Debian).*

### Step 2: Navigate to Project Directory
```bash
cd "c:/java mini proj"   # Or your cloned path: cd /path/to/tripmate
```

### Step 3: Option A – Fast 1-Click Launch (Recommended)
Make the included `start.sh` script executable and run it:
```bash
chmod +x start.sh
./start.sh
```
This script will automatically install missing packages, start the Express backend API on port 5000, and launch the Vite frontend on `http://localhost:5173`.

### Step 4: Option B – Manual Step-by-Step Launch

**Terminal 1 (Backend API):**
```bash
cd backend
npm install
npm run dev
# Backend runs at http://localhost:5000
```

**Terminal 2 (Frontend Client):**
```bash
cd frontend
npm install
npm run dev
# Frontend runs at http://localhost:5173
```

Open your browser and navigate to:
```
http://localhost:5173/
```

---

## 💻 How to Run the Project on Windows

You can run TripMate on Windows using either of the following methods:

### Method 1: Using the Batch Launcher
Double-click `start.bat` in the project root or run in Command Prompt:
```cmd
start.bat
```

### Method 2: Manual PowerShell Commands
```powershell
# Terminal 1:
cd "c:\java mini proj\backend"
npm run dev

# Terminal 2:
cd "c:\java mini proj\frontend"
npm run dev
```

Open `http://localhost:5173/` in your browser.

---

## 📡 API Endpoints Documentation

The backend Express server (`http://localhost:5000`) exposes the following endpoints:

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Health check endpoint returning server status and timestamp |
| `GET` | `/api/destinations` | List all destinations with optional `search`, `tag`, `region`, `maxBudget` |
| `GET` | `/api/destinations/:id`| Retrieve complete details for a specific destination |
| `POST`| `/api/trips/generate` | Generates day-wise itinerary, budget breakdown, hotels, food, and transport |
| `POST`| `/api/budget/calculate`| Recalculates budget when users modify allocation sliders or stay preferences |
| `POST`| `/api/trips/cheaper` | Analyzes trip and returns actionable money-saving recommendations |
| `GET` | `/api/weather` | Fetches live weather from Open-Meteo using `lat` and `lng` query params |
| `GET` | `/api/trips` | Retrieves all saved trips from backend disk storage |
| `POST`| `/api/trips/save` | Saves or updates a trip plan |
| `DELETE`| `/api/trips/:id` | Deletes a saved trip by ID |

---

## 🧮 Budget Calculation Engine Explained

1. **Accommodation Formula**:
   $$\text{Rooms Needed} = \begin{cases} \text{Travellers}, & \text{if Hostel Dorm} \\ \lceil \text{Travellers} / 2 \rceil, & \text{if Hotel / Homestay} \end{cases}$$
   $$\text{Stay Cost} = \text{Nightly Rate} \times \text{Rooms Needed} \times (\text{Days} - 1)$$

2. **Food Formula**:
   $$\text{Food Cost} = \text{Daily Food Rate per Style} \times \text{Days} \times \text{Travellers}$$
   *(₹350/day for Budget, ₹650/day for Standard, ₹1,200/day for Comfort).*

3. **Intercity Transit**:
   $$\text{Transit Cost} = (\text{One-Way Fare} \times 2) \times \text{Travellers}$$

4. **Sightseeing & Entry Tickets**:
   $$\text{Activities Cost} = \sum (\text{Attraction Entry Ticket}) \times \text{Travellers}$$

5. **Contingency Buffer**:
   $$\text{Emergency Reserve} = \text{Total Budget} \times 6\%$$

6. **Status Evaluation**:
   $$\text{Remaining Balance} = \text{Total Budget} - \text{Estimated Total Cost}$$
   If $\text{Remaining Balance} \ge 0 \implies \text{Within Budget}$, otherwise $\text{Over Budget}$.

---

## 🌿 Sustainable Tourism (SDG 8 & SDG 12)

TripMate directly integrates with the United Nations Sustainable Development Goals:

- **SDG 8: Decent Work and Economic Growth**:
  - Highlights community-owned homestays and heritage hostels to circulate tourism money within local host families rather than external aggregator conglomerates.
  - Recommends hiring certified local heritage guides.
- **SDG 12: Responsible Consumption and Production**:
  - Recommends public transportation (electric rickshaws, metros, bicycles, and regional trains).
  - Embeds daily tips against single-use plastic water bottles and advocates for "Leave No Trace" visiting protocols.

---

## 🛡️ Troubleshooting & FAQs

- **Port 5000 or 5173 is already in use**:
  You can specify a different port in `backend/src/server.js` by setting `PORT=5001` or running `npm run dev -- --port 3000` in `frontend`.
- **Live Weather indicates offline**:
  If your machine is not connected to the internet, TripMate automatically activates realistic seasonal fallback weather forecasts without crashing.
- **Can I run this offline?**:
  Yes! Once `npm install` has been run for both folders, the core budget engine, day-wise itineraries, local storage, and static assets work 100% offline.

---

## 🎓 Academic Demonstration Credits
Built as a modern, production-grade travel planning web application suitable for college project evaluation and full-stack software development demonstrations.
