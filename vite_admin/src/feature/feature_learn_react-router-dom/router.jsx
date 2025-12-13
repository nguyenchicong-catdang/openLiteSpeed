// vite_admin/src/feature/feature_learn_react-router-dom/router.jsx
import { createBrowserRouter } from "react-router";
import Root from './Root';
//import Layout from "./templates/Layout";
import { postRoutes } from "./routes/postRoutes";
const router = createBrowserRouter([
    // base : /src/feature/
    {
        path: "/src/feature/",
        Component: Root,
        children: [
            ...postRoutes,
        ]
    },
]);

export { router };