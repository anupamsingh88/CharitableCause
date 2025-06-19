
# 🤝 Charitable Cause – E-Donation Portal

**Charitable Cause** is a modern **E-Donation Portal** that empowers users to explore and support meaningful causes through a clean, user-friendly interface. The platform provides a seamless donation experience with real-time progress tracking, responsive design, and data-driven campaign listings.

🧠 Built with the assistance of **Replit AI Agent (No-Code)** and enhanced with manual setup for backend connectivity and database management using **Drizzle ORM** + **Neon Serverless PostgreSQL**.

---

## 🌐 Live Preview

🔗 [Visit Website](#) _(https://charitablecause.onrender.com/)_

---

## 🚀 Features

- 💡 **AI-Powered No-Code UI** (via Replit AI Agent)
- 🧾 **Campaign Listings** with donation progress and details
- ✨ **React + TypeScript** frontend for fast and reliable performance
- 🎨 **Tailwind CSS** styling for modern and responsive UI
- 📊 **Live Data Integration** using Neon PostgreSQL + Drizzle ORM
- 🔄 **Reusable Components** for donation cards, navbar, etc.
- 🌙 **Dark Mode** support
- ⚙️ Scalable backend with Node.js and Express.js
- 🔒 Structure ready for future user authentication and payment gateway integration

---

## 🛠 Tech Stack

| Layer           | Tech Used                                |
|------------------|--------------------------------------------|
| 🖥 Frontend        | React.js, TypeScript, Tailwind CSS         |
| ⚙️ Backend         | Node.js, Express.js                        |
| 🛢️ Database        | Neon (Serverless PostgreSQL)               |
| 🔗 ORM             | Drizzle ORM                                |
| ⚡ Development     | Replit AI Agent (No-code Development)       |

---

## 📦 Installation Guide

### 1. Clone the Repository
```bash
git clone https://github.com/anupamsingh88/CharitableCause.git
cd CharitableCause
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file at the root level:

```env
DATABASE_URL=your_neon_database_url
```

### 4. Install Drizzle ORM and Types

```bash
npm install drizzle-orm @neondatabase/serverless
npm install -D @types/ws
```

### 5. (Optional) Install Drizzle CLI for Migrations

```bash
npm install -D drizzle-kit
```

---

## 🗃️ Folder Structure

```
CharitableCause/
├── client/                 # React + Tailwind frontend
│   ├── src/
│   │   ├── components/     # Navbar, cards, buttons, etc.
│   │   ├── pages/          # Home, Donate, About, Contact
│   │   ├── styles/         # Tailwind and global styles
│   │   └── main.tsx        # React app entry
├── server/                 # Node + Express backend
│   ├── db/                 # Drizzle schema + config
│   ├── routes/             # Express routes
│   └── index.ts            # Main server entry point
├── drizzle.config.ts       # Drizzle ORM setup
├── .env                    # Environment variables
└── package.json
```

---

## 🧪 Useful Scripts

```bash
# Run both frontend and backend (if set up together)
npm run dev

# Generate SQL migration (optional)
npx drizzle-kit generate

# Push schema to Neon database
npx drizzle-kit push
```

---

## 📸 Screenshots

*(Add screenshots here showing: Home page, donation cards, dark mode UI, etc.)*

---

## 👨‍💻 Author

* **Anupam Singh**

---



---

❤️ Built for those who care. Developed with AI assistance and human empathy.
Easily adaptable for real-world NGOs, crowdfunding platforms, and donation campaigns.

```
