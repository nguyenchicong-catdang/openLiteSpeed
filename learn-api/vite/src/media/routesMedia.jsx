import ErrorPage from "../pages/ErrorPage";
import { mediaActionStore } from "./actions/mediaActionStore";
import Media from "./Media";
import MediaIndex from "./MediaIndex";
import MediaStore from "./MediaStore";

export const routesMedia = {
   path: "media",
   Component: Media,
   errorElement: <ErrorPage />,
   children: [
      {
         index: true,
         Component: MediaIndex
      },
      {
         path: 'store',
         action: mediaActionStore,
         Component: MediaStore
      }
   ],
};
