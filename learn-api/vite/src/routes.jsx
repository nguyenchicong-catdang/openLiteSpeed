import { createBrowserRouter } from "react-router";
import { authMiddleware } from "./middlewares/authMiddleware";
import Root from "./Root";
import App from "./App";
import Login from "./Login";
import Dashboard from "./pages/Dashboard";
import Posts from "./pages/Posts";
import PostsIndex from "./pages/posts/PostsIndex";
import PostsCreate from "./pages/posts/PostsCreate";
// Sử dụng Component thay vì element để đúng chuẩn v7
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
                    {
                        path: 'posts',
                        Component: Posts,
                        children: [
                            {
                                index: true,
                                Component: PostsIndex
                            },
                            {
                                path: 'create',
                                Component: PostsCreate
                            }
                        ]
                    }
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
