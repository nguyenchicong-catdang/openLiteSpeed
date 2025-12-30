import { Link, useLoaderData } from "react-router"

export default function PostsIndex() {
    const posts = useLoaderData();
  return (
      <div>
          <h1>Danh sach bai viet</h1>
          <ul>
              {posts.map(post => (
                  <li key={post.id}>
                      {/* <h3><a href="#">{post.title}</a></h3> */}
                      <Link to={`/posts/${post.id}`}>{post.title }</Link>
                      <p>{ post.content}</p>
                  </li>
              ))}
          </ul>
    </div>
  )
}
