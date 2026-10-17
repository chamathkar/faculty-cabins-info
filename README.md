# 🧭 Where’s Sir? — Faculty Cabin Finder

![React](https://img.shields.io/badge/Frontend-React-blue)
![Vercel](https://img.shields.io/badge/Deployment-Vercel-black)
![Serverless](https://img.shields.io/badge/Architecture-Serverless-green)
![Firebase](https://img.shields.io/badge/Database-Firebase-orange)
![License](https://img.shields.io/badge/License-MIT-yellow)

A fast and modern web application that helps students instantly find **faculty cabin locations, department information, and contact details**.

The project uses **React, Vercel Serverless Functions, and Firebase**, with **edge caching for high performance**.  
Students can also **rate faculty members based on teaching quality, correction strictness, and attendance policy**, with ratings stored in **Firebase Firestore**.

---

# 🌐 Live Demo

👉 https://faculty-cabins-info.vercel.app/

---

# ✨ Features

- 🔍 Instant Faculty Search  
- 🏢 View Cabin Location  
- 🏫 View Department / School  
- 📧 View Official Email  
- ⭐ Students can **rate faculty members**
- 📝 Ratings based on:
  - Teaching quality
  - Correction strictness
  - Attendance policy
- 🔥 Ratings stored in **Firebase Firestore**
- 📤 Share faculty profile on WhatsApp  
- ⚡ Edge caching for faster API responses  
- 📱 Fully responsive design  
- 🎬 Smooth page transitions  

---

# 🏗 Architecture

This project follows a **modern serverless architecture**.

```
User Browser
     │
     ▼
React Frontend (Vite + Tailwind)
     │
     ├── Faculty Data Request
     │       │
     │       ▼
     │   Vercel Serverless API (/api/faculty)
     │       │
     │       ▼
     │   Strapi CMS (vitap.ac.in)
     │
     └── Faculty Ratings
             │
             ▼
        Firebase Firestore
```

### Why this architecture?

Instead of calling the CMS directly from the browser, the frontend communicates with a **serverless API layer**.

Benefits:

- 🔐 Secure API token handling  
- 🚀 Faster responses using edge caching  
- 🛠 Ability to transform API data  
- 🧠 CMS structure hidden from the client  

Firebase is used to handle **user-generated data (faculty ratings)** efficiently.

---

# ⚡ Performance Optimization

The CMS API can be slow (~4 seconds), so the serverless API implements **Vercel Edge Caching**.

```
Cache-Control: s-maxage=600, stale-while-revalidate
```

### Result

| Request Type | Response Time |
|--------------|---------------|
| First Request | ~4 seconds |
| Cached Requests | ~50–200 ms |

---

# 🔥 Firebase Usage

Firestore usage over the last 30 days (**Nov 13 – Dec 13**):

| Operation | Total |
|-----------|------:|
| Reads | 25,000 |
| Writes | 869 |
| Deletes | 1 |

![Firebase Firestore usage statistics](public/images/Firebase%20stats.jpg)

---

# 🛠 Tech Stack

### Frontend
- React
- Vite
- React Router
- Tailwind CSS
- Framer Motion

### Backend
- Vercel Serverless Functions
- Node.js Fetch API

### Database (Ratings)
- Firebase
- Firestore

### CMS
- Strapi Headless CMS

### Deployment
- Vercel
- GitHub (repository and version control)

---

# 📂 Project Structure

```
faculty-cabin-info
│
├── api/
│   └── faculty.js        # Serverless API (fetch + transform + cache)
│
├── src/
│   ├── components/
│   │   └── Rating.jsx
│   │
│   ├── pages/
│   │   ├── FacultyList.jsx
│   │   ├── SearchFaculty.jsx
│   │   └── FacultyDetail.jsx
│   │
│   ├── services/
│   │   └── api.js
│   │
│   └── App.jsx
│
├── public/
├── package.json
└── README.md
```

---

# 🔐 Environment Variables

Add the following environment variables in **Vercel Project Settings → Environment Variables**

```
STRAPI_TOKEN=your_strapi_api_token

VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

These are used to connect to the CMS and Firebase services securely.

---

# 🚀 Running Locally

Clone the repository

```
git clone https://github.com/your-username/faculty-cabin-info.git
cd faculty-cabin-info
```

Install dependencies

```
npm install
```

Run the frontend

```
npm run dev
```

Run serverless functions locally

```
vercel dev
```

# 👨‍💻 Author

**Chamathkar**

Built to help students quickly locate faculty cabins at **VIT-AP University**.

---


