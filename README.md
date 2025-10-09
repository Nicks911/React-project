# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Authentication & Route Guards

- Set `VITE_API_URL` in your `.env` (e.g. `VITE_API_URL=http://localhost:4000`) so the frontend can reach the Express API.
- The app boots inside an `AuthProvider` (`src/context/AuthProvider.jsx`) which hydrates the logged-in user from `localStorage`, exposes `login`/`logout`, and normalises role-based redirects (shared constants live in `src/context/AuthContext.js`).
- `ProtectedRoute` (`src/Components/FrontEnd/Shared/ProtectedRoute.jsx`) works like middleware for React Router:
  - Unauthenticated visitors are redirected to `/login` and their original target is stored in router state.
  - Authenticated users hitting routes outside their role (e.g. customers on `/admin/*`) are redirected to their role home (`/home` for customers, `/admin/dashboard` for admins).
- The login form consumes the context so successful authentication updates global state and navigation, while logging out (via future UI) will clear the stored token/user payload.

## Project notes

- The backend Express server lives in `/server` and now exposes Mongo-backed endpoints for authentication at `POST /api/auth/register` and `POST /api/auth/login`.
- Configure the frontend to call the API by setting `VITE_API_URL` (defaults to `http://localhost:4000` if not provided).
- Authentication tokens are stored in `localStorage` by the login flow—ensure you protect these values appropriately in production (e.g., prefer HTTP-only cookies on a secure domain).
