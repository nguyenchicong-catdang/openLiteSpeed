import { Link } from "react-router";

export default function MediaSidebar() {
   const sidebarLinks = [
      { label: "Tất cả", type: "all", icon: "📁" },
      { label: "Hình ảnh", type: "image", icon: "🖼️" },
      { label: "Video", type: "video", icon: "🎥" },
      { label: "Tài liệu PDF", type: "pdf", icon: "📄" },
   ];
  return (
        <aside className="w-1/6">
           <h3>Thu Vien</h3>
           <ul>
              {sidebarLinks.map(link => (
                 <li key={link.type}>
                    <Link to={`/media?type=${link.type}`}>{link.icon}{ link.label}</Link>
                 </li>
              ))}
           </ul>
        </aside>
  )
}
