import { createBrowserRouter } from "react-router";
import { authMiddleware } from "./middlewares/authMiddleware";
import Root from "./Root";
import App from "./App";
import Login from "./Login";
import Dashboard from "./pages/Dashboard";
import Posts from "./pages/Posts";
import PostsIndex from "./components/posts/PostsIndex";
import PostsCreate from "./components/posts/PostsCreate";
import { postsLoader } from "./loaders/posts/postsLoader";
import PostsStore from "./components/posts/PostsStore";
import { postsStoreAction } from "./actions/posts/postsStoreAction";
import PostsShow from "./components/posts/PostsShow";
import { postsShowLoader } from "./loaders/posts/postsShowLoader";
import ErrorPage from "./pages/ErrorPage";
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
                                Component: PostsIndex,
                                loader: postsLoader
                            },
                            {
                                path: 'store',
                                Component: PostsStore,
                                action: postsStoreAction
                            },
                            {
                                path: ':id',
                                Component: PostsShow,
                                loader: postsShowLoader,
                                errorElement: <ErrorPage />
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
