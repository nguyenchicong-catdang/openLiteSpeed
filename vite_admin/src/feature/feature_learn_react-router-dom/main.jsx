// vite_admin/src/feature/feature_learn_react-router-dom/main.jsx

// https://github.com/facebook/react
import { createRoot } from 'react-dom/client';
import { RouterProvider } from "react-router/dom";

import { router } from './router';
const root = createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router} />,);
