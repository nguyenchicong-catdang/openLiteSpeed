import { Link } from "react-router"
export default function LinkMedia() {
  return (
     <ul>
        <li>
         <Link to="/media">Media Index</Link>
        </li>
        <li>
         <Link to="/media/store">Media Store</Link>
        </li>
    </ul>
  )
}
