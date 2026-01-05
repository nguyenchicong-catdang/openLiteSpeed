import ErrorPage from "../pages/ErrorPage";
import { quillActionDestroy } from "./actions/quillActionDestroy";
import { quillActionStore } from "./actions/quillActionStore";
import { quillActionUpdate } from "./actions/quillActionUpdate";
import { quillLoaderEdit } from "./loaders/quillLoaderEdit";
import { quillLoaderIndex } from "./loaders/quillLoaderIndex";
import { quillLoaderShowId } from "./loaders/quillLoaderShowId";
import Quill from "./Quill";
import QuillEdit from "./QuillEdit";
import QuillIndex from "./QuillIndex";
import QuillShowId from "./QuillShowId";
import QuillStore from "./QuillStore";

// quills/routesQuill.jsx
export const routesQuill = {
   path: "quills",
   Component: Quill,
   errorElement: <ErrorPage />,
   children: [
      {
         index: true,
         loader: quillLoaderIndex,
         Component: QuillIndex,
      },
      {
         path: "store",
         action: quillActionStore,
         Component: QuillStore,
      },
      {
         path: ":id",
         loader: quillLoaderShowId,
         Component: QuillShowId,
      },
      {
         path: ":id/edit",
         loader: quillLoaderEdit,
         Component: QuillEdit,
      },
      {
         path: ":id/update",
         action: quillActionUpdate,
      },
      {
         path: ":id/destroy",
         action: quillActionDestroy
      }
   ],
};
