
# 🏗️ Itinerary Comparer Backend Architecture (MERN Stack)

## 1. Overview
The backend will handle:

- User authentication and authorization
- Storage and retrieval of itineraries
- Comparison logic and results
- File parsing (JSON / PDF)
- Future integrations (email, notifications)

**Stack:**

- **MongoDB** – Database for storing itineraries and user data
- **Express.js** – REST API server
- **Node.js** – Server runtime
- **Multer / PDF parsing libraries** – Handling file uploads and extraction

---

## 2. System Components

### A. User Service
Handles authentication and user management:

- Sign up / Login / Logout
- Role-based access: `Customer` vs `Owner`
- Password hashing with bcrypt
- JWT-based authentication

### B. Itinerary Service
Handles storage and retrieval of itineraries:

- CRUD operations for itineraries:
  - Create: Upload JSON / PDF file or input manually
  - Read: Fetch individual or multiple itineraries
  - Update: Edit itinerary
  - Delete: Remove itinerary
- Validation of input data structure
- Storage: MongoDB collection `itineraries`

### C. Comparison Engine
Handles logic for comparing multiple itineraries:

- Compare:
  - Price
  - Duration (days/nights)
  - Accommodations & room types
  - Transportation options
- Return a structured comparison result:

```json
{
  "cheapest": "Plan A",
  "fastest": "Plan B",
  "details": []
}
```

- Implemented as a **service module** in Node.js

### D. File Handling / Parser
Handles JSON and PDF files:

- JSON files: Validate and store directly
- PDF files: Extract structured data using libraries like **pdf-parse** or **pdf.js**
- Multer middleware for handling multipart/form-data uploads

### E. API Layer (Express Routes)

| Endpoint                     | Method | Description |
|-------------------------------|--------|-------------|
| `/api/auth/register`           | POST   | Register new user |
| `/api/auth/login`              | POST   | Login user |
| `/api/itineraries`             | GET    | Get all itineraries |
| `/api/itineraries`             | POST   | Add new itinerary |
| `/api/itineraries/:id`         | GET    | Get itinerary by ID |
| `/api/itineraries/:id`         | PUT    | Update itinerary |
| `/api/itineraries/:id`         | DELETE | Delete itinerary |
| `/api/compare`                 | POST   | Compare multiple itineraries |

---

## 3. Database Schema (MongoDB)

### User Collection
```json
{
  "_id": "ObjectId",
  "name": "string",
  "email": "string",
  "password": "hashed_string",
  "role": "customer | owner",
  "createdAt": "Date"
}
```

### Itinerary Collection
```json
{
  "_id": "ObjectId",
  "packageName": "string",
  "ownerId": "ObjectId",
  "duration": { "days": 5, "nights": 4 },
  "price": 25000,
  "accommodations": [
    {
      "location": "string",
      "name": "string",
      "duration": { "days": 2, "nights": 1 },
      "roomType": ["string"],
      "totalRooms": 2
    }
  ],
  "transportation": {
    "ferry": ["string"],
    "air": ["string"]
  },
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

---

## 4. Middleware / Utilities
- **Auth Middleware** – Verify JWT token for protected routes
- **Validation Middleware** – Validate request body with **Joi** or **express-validator**
- **Error Handling Middleware** – Centralized error responses
- **File Upload Middleware** – Multer for handling PDFs/JSON

---

## 5. Flow Diagram

**Request Flow (High-Level)**

![Example](https://github.com/Kaustubh01/Itinerary-Comparer/blob/main/Backend%20Flow.png?raw=true)

---

## 6. Deployment & Scaling
- **Hosting:** Node.js server on **Heroku / AWS / Vercel**
- **Database:** MongoDB Atlas (cloud) or self-hosted
- **File Storage:** AWS S3 for PDFs/images
- **Scaling Considerations:**
  - Use separate services for comparison engine for heavy load
  - Caching frequently requested itineraries with **Redis**
  - Rate-limiting for public API endpoints

---

## 7. Future Enhancements
- Real-time collaboration using **WebSockets**
- Analytics dashboard for owners
- Multi-format support: CSV, Excel
- AI-assisted itinerary recommendations

---

## Author
**Kaustubh Mayekar**  
