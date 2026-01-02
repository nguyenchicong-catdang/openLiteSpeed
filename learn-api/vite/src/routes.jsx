import { createBrowserRouter } from "react-router";
import { authMiddleware } from "./middlewares/authMiddleware";
import Root from "./Root";
import App from "./App";
import Login from "./Login";
import Dashboard from "./pages/Dashboard";
// Sử dụng Component thay vì element để đúng chuẩn v7
import { routesPosts } from "./routes/routesPosts";

const routesResoures = [
  routesPosts
]
const routes = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        path: '/',
        middleware: [authMiddleware],
        Component: App,
        children: [
          {
            index: true,
            Component: Dashboard
          },
          ...routesResoures,
        ]
      },
      {
        path: "login",
        Component: Login
      },
    ]
  },
]);

export { routes };
