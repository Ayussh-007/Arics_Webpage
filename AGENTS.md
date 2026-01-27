# AGENTS.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a React single-page application built with Vite, using the SWC plugin for Fast Refresh. The project is currently at a minimal template stage with a basic counter component.

## Tech Stack

- **Framework**: React 19.2.0
- **Build Tool**: Vite 7.2.4 with @vitejs/plugin-react-swc
- **Language**: JavaScript (JSX)
- **Linting**: ESLint 9.39.1 with flat config
- **Module System**: ES Modules

## Development Commands

```bash
# Start development server with HMR
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

## Project Structure

```
├── index.html           # Entry HTML file
├── src/
│   ├── main.jsx        # Application entry point, renders App with StrictMode
│   ├── App.jsx         # Main App component
│   ├── App.css         # App-specific styles
│   ├── index.css       # Global styles
│   └── assets/         # Static assets (images, SVGs)
├── public/             # Public assets served at root
├── vite.config.js      # Vite configuration
├── eslint.config.js    # ESLint flat config
└── package.json        # Dependencies and scripts
```

## Code Architecture

- **Entry Flow**: `index.html` → `src/main.jsx` → `src/App.jsx`
- The app uses React's `createRoot` API (React 18+ concurrent rendering)
- All components are wrapped in `StrictMode` for additional development checks
- Vite handles HMR automatically for `.jsx` files

## ESLint Configuration

The project uses the new ESLint flat config format with:
- React Hooks rules enforced
- React Refresh plugin for Vite
- Custom rule: unused variables starting with uppercase or underscore are ignored
- Browser globals configured
- ECMAScript 2020/latest features enabled
- `dist/` directory ignored

## Important Notes

- This project uses **SWC** for Fast Refresh, not Babel
- The React Compiler is currently **not compatible** with SWC
- No test framework is configured yet
- No TypeScript setup (plain JavaScript/JSX)
- Assets in `src/assets/` are bundled by Vite, while `public/` assets are served at root
