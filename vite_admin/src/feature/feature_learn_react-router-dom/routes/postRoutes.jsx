// vite_admin/src/feature/feature_learn_react-router-dom/routes/postRoutes.jsx

import PostLayout from "../pages/posts/PostLayout";
import PostList from "../pages/posts/PostList";

const postRoutes = [
    {
        path: "post",
        Component: PostLayout,
        children: [
            {
                path: "list",
                Component: PostList
            }
        ]
    }
]
    

export { postRoutes };