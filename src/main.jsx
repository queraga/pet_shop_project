import { createRoot } from "react-dom/client";
import "./index.css";
import App from "../src/app/App.jsx";

import AppProvider from "./app/providers/AppProviders.jsx";

createRoot(document.getElementById("root")).render(
  <AppProvider>
    <App />
  </AppProvider>,
);
