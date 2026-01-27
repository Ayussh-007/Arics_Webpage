# Arics Bouquet Builder (MERN)

Luxury, glassmorphism-inspired bouquet customisation experience with a dynamic admin panel.

## Stack
- Frontend: React + Vite + Tailwind + Framer Motion (JSX)
- Backend: Node + Express + MongoDB (Mongoose)

## Quick start

### 1) Install frontend deps
```bash
npm install
```

### 2) Install backend deps
```bash
npm --prefix server install
```

### 3) Configure environment
Copy `server/.env.example` to `server/.env` and update values.

### 4) Seed database
```bash
npm --prefix server run seed
```

### 5) Run both client + server
```bash
npm run dev:all
```

Frontend: `http://localhost:5173`  
Backend: `http://localhost:5000`

## Admin login
Use the credentials from `server/.env` (default: `admin@arics.com` / `ChangeMe123!`).

## Connect the customisation app
The bouquet builder UI is in `src/customisation/CustomisationApp.jsx`.
You can render it from `src/App.jsx` like:
```jsx
import { CustomisationApp } from './customisation'

export default function App() {
  return <CustomisationApp />
}
```

## Notes
- The system is dynamic: new flowers and customization options appear without frontend code changes.
- Image handling is URL-based (add image URLs to items in admin).
