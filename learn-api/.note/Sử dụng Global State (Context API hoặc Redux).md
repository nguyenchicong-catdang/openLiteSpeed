# Tạo một component bao bọc (Wrapper) đặt trong App.js hoặc main.jsx.
```jsx
// Trong App.jsx hoặc một Layout Component
import { useLocation } from "react-router";
import { useRef, useEffect } from "react";

export function HistoryTracker({ children }) {
  const location = useLocation();
  const lastPath = useRef("/"); // Dùng useRef để lưu mà không trigger re-render

  useEffect(() => {
    // Trước khi cập nhật, lưu lại trang hiện tại vào localStorage hoặc Context
    localStorage.setItem("prevPath", lastPath.current);
    lastPath.current = location.pathname;
  }, [location]);

  return children;
}
```
## Khi sử dụng ở trang Edit:
```jsx
const clickBtnCancel = () => {
   const back = localStorage.getItem("prevPath") || "/quills";
   navigate(back);
};
```
# Kết hợp: Cách "xịn" nhất
```jsx
const navigate = useNavigate();
const location = useLocation();

const clickBtnCancel = () => {
    // Nếu có state từ Link thì dùng, không thì thử quay lại lịch sử, 
    // cuối cùng mới dùng mặc định
    if (location.state?.from) {
        navigate(location.state.from);
    } else {
        // Kiểm tra xem có lịch sử trình duyệt không
        window.history.length > 1 ? navigate(-1) : navigate("/quills");
    }
};
```
