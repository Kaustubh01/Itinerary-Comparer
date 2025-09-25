
# 🗺️ Itinerary Comparer

A web application that allows users to **upload or paste multiple travel itineraries**, compare them side-by-side, and choose the best travel plan based on **cost, duration, and number of included features**.  

This is currently a **frontend prototype** built with React, designed to showcase the core comparison functionality.

---

## 🚀 Features

- **Upload Travel Itineraries (JSON)**
- **Parse and Display Itineraries** in a clean, user-friendly grid
- **Side-by-Side Comparison** of 2 or more itineraries
- **Highlight Key Differences** (pricing, accommodations, transportation)
- Responsive mobile friendly UI built with **Tailwind CSS**

---

## 🛠️ Tech Stack

| **Layer**        | **Technology** |
|-------------------|----------------|
| **Frontend**      | React (Vite), React Router DOM |
| **Styling**       | Tailwind CSS |
| **State Management** | React Context API |

---

## 📂 Project Structure

```
itinerary-comparer/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── Navbar.jsx
│   │   ├── HolidayPackageForm.jsx
│   │   ├── PlansGrid.jsx
│   │   └── ComparePlans.jsx
│   │
│   ├── context/           # Global state management
│   │   └── PlansContext.jsx
│   │
│   ├── pages/             # Future routing pages
│   │
│   └── App.jsx            # Root component
│
├── public/                # Static assets
├── package.json
└── README.md
```

---

## ⚙️ Installation & Setup

### **Prerequisites**
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or above)
- npm or yarn

### **Steps**
1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/itinerary-comparer.git
   cd itinerary-comparer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. Open your browser and visit:
   ```
   http://localhost:5173
   ```

---

## 🧑‍💻 Usage

1. **Add a Plan:**  
   - Use the "Add Plan" button to input travel plan.

2. **View Plans:**  
   - All added itineraries will be displayed in a grid layout.

3. **Compare Plans:**  
   - Select two itineraries to compare.
   - View highlighted differences in price, duration, and included activities.

---

## 🧾 Example JSON Format
You can upload itineraries in the following JSON format:

```json
{
  "packageName": "Andaman Holiday Package",
  "duration": {
    "days": 5,
    "nights": 4
  },
  "price": 25000,
  "accommodations": [
    {
      "location": "Port Blair",
      "name": "Seaside Hotel",
      "duration": { "days": 2, "nights": 1 },
      "roomType": ["Deluxe"],
      "totalRooms": 2
    }
  ],
  "transportation": {
    "ferry": ["Port Blair -> Havelock"],
    "air": ["Mumbai -> Port Blair"]
  }
}
```

---

## 🧱 Future Roadmap

- [ ] **Backend API** for secure data storage and retrieval
- [ ] **User Authentication** with role-based access (Owner vs Customer)  
- [ ] **Advanced Comparison Logic** (hidden fees, exclusions, etc.)

---


## 💡 Inspiration
This project was built as part of a **React/MERN technical assessment** to demonstrate product thinking, scalability planning, and frontend development skills.

---

## 👨‍💻 Author
**Kaustubh Mayekar**  
- GitHub: [Kaustubh01](https://github.com/Kaustubh01)
