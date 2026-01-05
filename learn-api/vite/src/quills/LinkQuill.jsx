import { Link } from "react-router";

export default function LinkQuill() {
  return (
     <ul>
        <li>
        <Link to="/quills">Quill Index</Link>
        </li>
        <li>
        <Link to="/quills/store">Quill Store</Link>
        </li>
    </ul>
  )
}
