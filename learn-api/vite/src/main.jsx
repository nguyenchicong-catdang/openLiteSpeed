// main.jsx
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { routes } from './routes';
import './tailwindcss/main.css'

const root = createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={routes} />
);
