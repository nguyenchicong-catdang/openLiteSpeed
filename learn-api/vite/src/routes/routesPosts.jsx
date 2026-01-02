import { postsDestroyAction } from "../actions/posts/postsDestroyAction"
import { postsStoreAction } from "../actions/posts/postsStoreAction"
import { postsUpdateAction } from "../actions/posts/postsUpdateAction"
import PostsCreate from "../components/posts/PostsCreate"
import PostsEdit from "../components/posts/PostsEdit"
import PostsIndex from "../components/posts/PostsIndex"
import PostsShow from "../components/posts/PostsShow"
import PostsStore from "../components/posts/PostsStore"
import { postsEditLoader } from "../loaders/posts/postsEditLoader"
import { postsLoader } from "../loaders/posts/postsLoader"
import { postsShowLoader } from "../loaders/posts/postsShowLoader"
import ErrorPage from "../pages/ErrorPage"
import Posts from "../pages/Posts"

// routes/routesPosts.jsx
export const routesPosts =
{
   path: 'posts',
   Component: Posts,
   errorElement: <ErrorPage />,
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
         path: ':id/edit',
         Component: PostsEdit,
         loader: postsEditLoader,
         action: postsUpdateAction,
         errorElement: <ErrorPage />
      },
      {
         path: ':id/destroy',
         //fetcher.submit(data, options)
         action: postsDestroyAction
      },
      {
         path: 'create',
         Component: PostsCreate
      }
   ]
}

