import { useLocation, useRouteError } from "react-router"

export default function ErrorPage() {
    const error = useRouteError();
    const location = useLocation();
    //console.error(error, location)
  return (
      <div>
          <h1>Rất tiếc! Đã có lỗi xảy ra.</h1>
          <p>{error.data || "Lỗi mạng hoặc server không phản hồi"}</p>

    </div>
  )
}
