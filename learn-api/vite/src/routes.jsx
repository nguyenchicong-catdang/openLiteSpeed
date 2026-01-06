import { createBrowserRouter } from "react-router";
import { authMiddleware } from "./middlewares/authMiddleware";
import Root from "./Root";
import App from "./App";
import Login from "./Login";
import Dashboard from "./pages/Dashboard";
// Sử dụng Component thay vì element để đúng chuẩn v7
import { routesPosts } from "./routes/routesPosts";
import { uploadImageAction } from "./actions/posts/upload/uploadImageAction";
import ErrorPage from "./pages/ErrorPage";

import { routesQuill } from "./quills/routesQuill";
import HydrateFallback from "./HydrateFallback";
import { routesMedia } from "./media/routesMedia";
const routesResoures = [routesPosts, routesQuill, routesMedia];
const routes = createBrowserRouter([
   {
      path: "/",
      hydrateFallbackElement: <HydrateFallback />,
      Component: Root,
      errorElement: <ErrorPage />,
      children: [
         {
            path: '/',
            middleware: [authMiddleware],
            Component: App,
            errorElement: <ErrorPage />,
            children: [
               {
                  index: true,
                  Component: Dashboard
               },
               {
                  path: '/upload/image',
                  action: uploadImageAction,
                  errorElement: <ErrorPage />,
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
