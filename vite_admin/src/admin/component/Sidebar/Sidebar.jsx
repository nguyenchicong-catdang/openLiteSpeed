// vite_admin/src/admin/component/Sidebar/Sidebar.jsx (ĐÃ SỬA)

import { Link } from 'react-router-dom';
function Sidebar() {
    return (
        <aside className="sidebar">
            <ul>
                {/* Link đến các Route đã định nghĩa */}
                <li><Link to="/post-list">Post list</Link></li>
                <li><Link to="/post-insert">Post insert</Link></li>
                <li><Link to="/post-update/1">Post update</Link></li>
            </ul>
        </aside>
    );
}

export default Sidebar;