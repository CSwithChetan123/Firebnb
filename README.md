# Firebnb 🚀 (Full-Stack Airbnb Clone)

Firebnb is a production-ready, full-stack web application designed to replicate the core features of Airbnb. Built using the **Model-View-Controller (MVC)** architectural pattern, this platform handles dynamic property listings, secure user authentication, role-based authorization, and real-time cloud data persistence.

🔗 **Live Deployment:** [https://firebnb-qq5q.onrender.com](https://firebnb-qq5q.onrender.com)  

---

> ⚠️ **Note on Live Demo:** This application is hosted on **Render's Free Tier**. If the site has been inactive, the server automatically goes into a temporary sleep mode. Please allow **50–60 seconds** for the initial spin-up when clicking the live link for the first time. Subsequent page loads will be instantaneous.

---

## 🛠️ Tech Stack

### Frontend (View Layer)
* **HTML5 & CSS3** – Semantic markup and custom modern layouts.
* **Bootstrap 5** – Responsive 12-column grid system ensuring smooth UI compatibility across mobile, tablet, and desktop viewports.
* **EJS (Embedded JavaScript)** – Server-Side Rendering (SSR) engine used to dynamically inject database payloads into HTML views.

### Backend (Controller Layer)
* **Node.js** – Asynchronous, event-driven JavaScript runtime environment.
* **Express.js** – Robust backend routing framework configured with RESTful API architecture.
* **Method-Override** – Middleware used to support structural `PUT` and `DELETE` actions from native HTML client forms.

### Database (Model Layer)
* **MongoDB Atlas** – Cloud-hosted, distributed NoSQL database setup for dynamic document scalability.
* **Mongoose ODM** – Object Data Modeling library defining strict data validation schemas over schema-less BSON collections.

---

## ✨ Key Features

* **Full CRUD Implementation:** Users can smoothly execute complete Data Life Cycle actions—**Create** new listings, **Read** deep-dive property overviews, **Update** operational listings, and **Delete** properties permanently from the UI.
* **Stateful Session Management:** Leverages `express-session` to assign encrypted session ID cookies to client browsers, keeping users logged in across pages without breaking application state.
* **Authentication Pipeline:** Managed via the `Passport.js` ecosystem (`passport-local` and `passport-local-mongoose`). Passwords undergo automated salt generation and secure cryptographic hashing before ever being stored.
* **Granular Authorization Rules:** Custom backend middleware actively shields protected routes. It verifies that a logged-in user is the actual `owner` of an existing property listing before executing critical `PUT` or `DELETE` requests.
* **Production Error Isolation:** Core database queries utilize explicit `async/await` syntax structurally wrapped inside `try...catch` blocks to capture and gracefully isolate unexpected production runtime exceptions.

---

## 🏗️ System Architecture

The monolithic application is split cleanly based on individual architectural responsibilities:

```text
                  +-----------------------------------+
                  |          Client Browser           |
                  +-----------------+-----------------+
                                    |
                       HTTP Request | HTTP Response
                                    v
+-----------------------------------o-----------------------------------+
| Express.js Server (Backend Runtime)                                   |
|                                                                       |
|   [Controllers / Routes] <======> [Views (EJS Templates)]             |
|          ^                                                            |
|          | (Mongoose ODM Queries)                                     |
|          v                                                            |
|   [Models (Data Schemas)]                                             |
+----------+------------------------------------------------------------+
           |
           v
+----------+------------------------+
| MongoDB Atlas (Cloud Database)    |
+-----------------------------------+

```

---

## 🚀 Local Installation & Setup

To clone and run this application locally on your computer, follow these configuration steps:

### 1. Prerequisites

Ensure you have **Node.js** (v16+ recommended) and **npm** installed on your machine.

### 2. Clone the Repository

```bash
git clone https://github.com/CSwithChetan123/Firebnb

```

### 3. Install Dependencies

```bash
npm install

```

### 4. Configure Environment Variables

Create a `.env` file in the root directory of your project and populate it with your own cloud connection strings and session keys (never share your actual keys publicly):

```env
MONGO_ATLAS_URL=mongodb+srv://your_username:your_password@cluster.example.mongodb.net/your_db_name
SECRET_KEY=your_custom_session_encryption_secret
PORT=3000

```

### 5. Run the Application

```bash
# Start server in production mode
npm start

# Alternatively, start server using nodemon for active development
nodemon app.js

```

Open your browser and navigate to `http://localhost:3000` to view the running application.

```

```
