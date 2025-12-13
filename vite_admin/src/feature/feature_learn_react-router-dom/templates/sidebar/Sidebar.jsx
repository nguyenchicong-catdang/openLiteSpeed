// vite_admin/src/feature/feature_learn_react-router-dom/templates/sidebar/Sidebar.jsx
import { Link } from "react-router";
function Sidebar() {
    return (
        <ul>
            <li>
                <Link to="/src/feature/post">Post</Link>
            </li>
            <li>
                <Link to="/src/feature/post/list">Post List</Link>
            </li>
        </ul>
    );
}

export default Sidebar;