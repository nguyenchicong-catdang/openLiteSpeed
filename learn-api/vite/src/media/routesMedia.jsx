import ErrorPage from "../pages/ErrorPage";
import { mediaActionStore } from "./actions/mediaActionStore";
import {mediaActionUpdate} from "./actions/mediaActionUpdate";
// import MediaRightSidebar from "./components/MediaRightSidebar";
import {mediaLoaderShow} from "./loaders/mediaLoaderShow";
import {mediaLoaderIndex} from "./loaders/mediaLoaderIndex";
import Media from "./Media";
import MediaEdit from "./MediaEdit";
import MediaIndex from "./MediaIndex";
import MediaStore from "./MediaStore";

export const routesMedia = {
   path: "media",
   Component: Media,
   errorElement: <ErrorPage />,
   children: [
      {
         path: "",
         loader: mediaLoaderIndex,
         Component: MediaIndex,
         // CHẶN FETCH LẠI DANH SÁCH KHI CHỈ XEM CHI TIẾT
         shouldRevalidate: ({ currentUrl, nextUrl, formMethod }) => {
            // Nếu nhấn nút Save (action) thì phải load lại để cập nhật data mới
            if (formMethod) return true;

            // Nếu chỉ là chuyển ID (ví dụ từ /media sang /media/1)
            // mà không đổi filter 'type' thì KHÔNG fetch lại danh sách
            return (
               currentUrl.searchParams.get("type") !==
               nextUrl.searchParams.get("type")
            );
         },
         children: [
            {
               path: ":id",
               action: mediaActionUpdate,
               loader: mediaLoaderShow,
               Component: MediaEdit,
            },
         ],
      },
      {
         path: "store",
         action: mediaActionStore,
         Component: MediaStore,
      },
      // {
      //    path: ':id/update',
      //    action: mediaActionUpdate,
      // }
   ],
};
