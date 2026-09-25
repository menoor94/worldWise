# 🌍 WorldWise — README

A travel-tracking web app built with **React**, **React Router**, **Context API**, **Leaflet**, and **Vite**. Log the cities and countries you've visited, add notes, and see them pinned on an interactive world map.

---

## ✨ Features

- 🗺️ **Interactive world map** — Powered by Leaflet & OpenStreetMap
- 📍 **Pin cities** — Click anywhere on the map to log a visited city
- 🏙️ **City list** — View all visited cities in a sidebar
- 📝 **Add notes** — Remember what you did and when you visited
- 🌐 **Country info** — Flags, country names, and emoji
- 🔒 **Protected routes** — Login required to access the app
- 🧭 **Geolocation** — Auto-detect your current position
- ⚡ **Fast & responsive** — Built with Vite

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| [React](https://react.dev/) | UI library |
| [React Router](https://reactrouter.com/) | Client-side routing |
| [Context API](https://react.dev/reference/react/useContext) | Global state (cities, auth) |
| [Leaflet](https://leafletjs.com/) + [React Leaflet](https://react-leaflet.js.org/) | Interactive maps |
| [Vite](https://vitejs.dev/) | Build tool & dev server |
| CSS Modules | Scoped styling |

---

## 🚀 Getting Started

### Prerequisites

- Node.js **v18+**
- npm 

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/worldwise.git
cd worldwise

# Install dependencies
npm install

# Start the dev server
npm run dev
```

The app will run at **http://localhost:5173**.

### Build for production

```bash
npm run build
npm run preview
```

---


## 🧭 Routes

| Path | Description |
|------|-------------|
| `/` | Homepage — start here |
| `/login` | Login page (fake auth) |
| `/app` | App layout with map & sidebar |
| `/app/cities` | List of visited cities |
| `/app/countries` | List of visited countries |
| `/app/form` | Add a new city |
| `/app/cities/:id` | View details of a single city |
| `*` | 404 — Page not found |

---

## 🗃️ State Management

Global state is managed with **React Context API**:

- **`CitiesContext`** — Fetches, adds, and deletes cities; tracks loading & error state
- **`FakeAuthContext`** — Simple mock login/logout for protected routes

---

## 🪝 Custom Hooks

| Hook | Purpose |
|------|---------|
| `useGeolocation` | Gets the user's current latitude/longitude |
| `useUrlPosition` | Reads `lat` & `lng` from the URL query string |

---

## 🌐 API

This project uses a local JSON server (or demo API) for city data:

```
http://localhost:9000/cities
```

Endpoints used:
- `GET /cities` — Fetch all cities
- `POST /cities` — Add a new city
- `DELETE /cities/:id` — Remove a city

> You can also point it at the demo API from the course.

---

## 🗺️ Map Configuration

The map uses **Leaflet** with **OpenStreetMap** tiles:

```js
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);
```

To use a different provider (Mapbox, Stadia, etc.), swap the tile URL and add your API key.

---

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---


## 🙏 Acknowledgements

- Course & inspiration by **Jonas Schmedtmann** — *The Ultimate React Course*
- Map tiles by [OpenStreetMap](https://www.openstreetmap.org/)
- Icons by [React Icons](https://react-icons.github.io/react-icons/)

---
