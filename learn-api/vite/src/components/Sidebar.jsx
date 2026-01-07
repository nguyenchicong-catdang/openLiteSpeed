import { Link } from "react-router"
import LinkQuill from "../quills/LinkQuill"
import LinkMedia from "../media/LinkMedia"
export default function Sidebar() {
  return (
     <aside>
        <Link className="bg-blue-300 text-red-800" to="/login">Login</Link>
          {/* <ul>
              <li>
                <Link to="/">Dashboard</Link>
              </li>
              <li>
                  <Link to="posts">Posts</Link>
                  <ul>
                      <li>
                          <Link to="posts">Posts All</Link>
                      </li>
                      <li>
                          <Link to="posts/store">Posts Store</Link>
                      </li>
                      <li>
                        <Link to="posts/create">Post Create</Link>
                      </li>

                      <li>
                        <Link></Link>
                      </li>
                  </ul>
              </li>
              <li>
                <Link></Link>
              </li>
          </ul> */}
        {/* <LinkQuill /> */}
        <LinkMedia />
    </aside>
  )
}
